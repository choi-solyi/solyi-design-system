<script setup lang="ts">
import { solIconPaths } from 'solyi-ui/icons'
import { recipeComponents, recipeLabels } from './recipe-registry'

const layoutPart = new URLSearchParams(window.location.search).get('part') || undefined

type RecipeId = keyof typeof recipeComponents
type RecipeHandle = { confirmLeave?: () => boolean | Promise<boolean> }
type RecipePosition = { session: string; index: number }
const groups: { label: string; items: RecipeId[] }[] = [
  {
    label: '기본 표현',
    items: ['color-examples', 'writing', 'buttons', 'button-group', 'confirm-action', 'chip', 'badge', 'icon', 'icon-button', 'fields', 'choices', 'feedback'],
  },
  {
    label: '입력과 선택',
    items: [
      'checkbox',
      'radio-group',
      'switch',
      'select',
      'selection',
      'advanced-inputs',
      'inputs',
      'combobox',
      'time',
      'form',
      'composition',
      'error-summary',
    ],
  },
  {
    label: '탐색과 오버레이',
    items: ['dialog', 'tooltip', 'popover', 'help', 'accordion', 'breadcrumbs', 'pagination', 'navigation', 'content-tabs', 'action-menu'],
  },
  {
    label: '자료와 상태',
    items: ['data', 'search', 'compare', 'empty', 'responses', 'progress', 'progress-circular', 'chart', 'chart-tree'],
  },
  {
    label: '화면과 작업 흐름',
    items: ['layouts', 'workflow', 'bulk-recovery', 'avatar', 'identity-progress'],
  },
]
const media = window.matchMedia('(min-width: 1100px)')
const wide = ref(media.matches)
const menuOpen = ref(false)
const navigation = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const menuToggle = useTemplateRef<{ $el: HTMLElement }>('menuToggle')
const recipeInstance = useTemplateRef<RecipeHandle>('recipeInstance')
const historyKey = 'solyiRecipeNavigation'
function readPosition(state: unknown): RecipePosition | undefined {
  const value = (state as Record<string, unknown> | null)?.[historyKey] as
    RecipePosition | undefined
  return value && typeof value.session === 'string' && Number.isInteger(value.index)
    ? value
    : undefined
}
const initialPosition = readPosition(history.state)
const historySession = initialPosition?.session ?? `recipe-${Date.now()}-${Math.random()}`
let displayedIndex = initialPosition?.index ?? 0
let displayedUrl = location.href
let displayedState = history.state
let navigationRequest = 0
let disposed = false
let returningHistory: { index: number; resolve: () => void } | undefined
let approvedHistory: { index: number; url: string; request: number } | undefined
function historyState(index: number) {
  return {
    ...(history.state && typeof history.state === 'object' ? history.state : {}),
    [historyKey]: { session: historySession, index },
  }
}
async function canLeave(): Promise<boolean> {
  try {
    return (await recipeInstance.value?.confirmLeave?.()) !== false
  } catch {
    return false
  }
}
const links = new Map<RecipeId, HTMLElement>()
function setLink(id: RecipeId, element: unknown) {
  if (element instanceof HTMLElement) links.set(id, element)
  else links.delete(id)
}
const selected = ref<RecipeId>(readSelection())
const current = computed(() => recipeComponents[selected.value])
const currentGroup = computed(
  () => groups.find(group => group.items.includes(selected.value))?.label,
)

function readSelection(): RecipeId {
  const value = new URLSearchParams(location.search).get('example')
  return value && Object.hasOwn(recipeComponents, value) ? (value as RecipeId) : 'buttons'
}
function href(id: RecipeId): string {
  const url = new URL(location.href)
  url.searchParams.set('example', id)
  return url.pathname + url.search + url.hash
}
function revealSelection() {
  const list = navigation.value
  const item = links.get(selected.value)
  if (!list || !item || (!wide.value && !menuOpen.value)) return
  const box = list.getBoundingClientRect()
  const row = item.getBoundingClientRect()
  if (row.top < box.top + 8) list.scrollTop -= box.top + 8 - row.top
  else if (row.bottom > box.bottom - 8) list.scrollTop += row.bottom - box.bottom + 8
}
async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    await nextTick()
    revealSelection()
  }
}
async function showExample(id: RecipeId) {
  selected.value = id
  menuOpen.value = false
  await nextTick()
  title.value?.focus()
  revealSelection()
}
async function select(event: MouseEvent, id: RecipeId) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  if (returningHistory || approvedHistory) return
  const request = ++navigationRequest
  if (selected.value !== id && !(await canLeave())) return
  if (disposed || request !== navigationRequest) return
  if (selected.value !== id) {
    displayedIndex++
    history.pushState(historyState(displayedIndex), '', href(id))
  }
  displayedUrl = location.href
  displayedState = history.state
  await showExample(id)
}
function acceptHistory(index: number) {
  displayedIndex = index
  displayedUrl = location.href
  displayedState = history.state
  void showExample(readSelection())
}
async function restoreHistory(event: PopStateEvent) {
  const position = readPosition(event.state)
  const index = position?.session === historySession ? position.index : undefined
  if (returningHistory) {
    if (index === returningHistory.index) {
      const resolve = returningHistory.resolve
      returningHistory = undefined
      resolve()
    } else if (index !== undefined) history.go(displayedIndex - index)
    return
  }
  if (approvedHistory && approvedHistory.index === index && approvedHistory.url === location.href) {
    const approved = approvedHistory
    approvedHistory = undefined
    if (!disposed && approved.request === navigationRequest) acceptHistory(approved.index)
    return
  }
  approvedHistory = undefined
  const request = ++navigationRequest
  const targetUrl = location.href
  const targetId = readSelection()
  if (targetId === selected.value && index !== undefined) {
    acceptHistory(index)
    return
  }
  // Browser traversal has already changed the URL. Restore the displayed entry
  // before asking, then traverse to the original target only after approval.
  if (index !== undefined && index !== displayedIndex) {
    const delta = index - displayedIndex
    await new Promise<void>(resolve => {
      returningHistory = { index: displayedIndex, resolve }
      history.go(-delta)
    })
    if (disposed || request !== navigationRequest || !(await canLeave())) return
    if (disposed || request !== navigationRequest) return
    approvedHistory = { index, url: targetUrl, request }
    // Finish the restoring popstate task before starting the approved traversal.
    await new Promise<void>(resolve => setTimeout(resolve, 0))
    if (disposed || request !== navigationRequest) return
    history.go(delta)
    return
  }
  // An entry created outside this explorer has no position marker. Keep the
  // current URL/draft until approval rather than switching the component early.
  history.replaceState(displayedState, '', displayedUrl)
  if (!(await canLeave()) || disposed || request !== navigationRequest) return
  displayedIndex++
  history.pushState(historyState(displayedIndex), '', targetUrl)
  acceptHistory(displayedIndex)
}
function closeMenu(restore = false) {
  menuOpen.value = false
  if (restore) nextTick(() => menuToggle.value?.$el?.focus())
}
function escape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || wide.value || !menuOpen.value) return
  event.preventDefault()
  event.stopPropagation()
  closeMenu(true)
}
function outside(event: Event) {
  const target = event.target as Node
  if (
    !wide.value &&
    menuOpen.value &&
    !navigation.value?.contains(target) &&
    !menuToggle.value?.$el?.contains(target)
  )
    closeMenu()
}
function focusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next && !navigation.value?.contains(next) && next !== menuToggle.value?.$el) closeMenu()
}
function resize(event: MediaQueryListEvent) {
  const focusedInList = navigation.value?.contains(document.activeElement)
  const focusedToggle = document.activeElement?.id === 'recipe-menu-toggle'
  wide.value = event.matches
  menuOpen.value = !event.matches && !!focusedInList
  if (event.matches && focusedToggle) nextTick(() => links.get(selected.value)?.focus())
}
onMounted(() => {
  if (new URLSearchParams(location.search).get('example') !== selected.value)
    history.replaceState(historyState(displayedIndex), '', href(selected.value))
  else history.replaceState(historyState(displayedIndex), '', location.href)
  displayedUrl = location.href
  displayedState = history.state
  window.addEventListener('popstate', restoreHistory)
  media.addEventListener('change', resize)
  document.addEventListener('pointerdown', outside)
  nextTick(revealSelection)
})
onBeforeUnmount(() => {
  disposed = true
  navigationRequest++
  returningHistory?.resolve()
  returningHistory = undefined
  window.removeEventListener('popstate', restoreHistory)
  media.removeEventListener('change', resize)
  document.removeEventListener('pointerdown', outside)
})
</script>

<template>
  <section class="recipe-explorer">
    <header>
      <h1>컴포넌트 미리보기</h1>
      <p>분류에서 예제를 골라 확인하세요. 문서의 코드와 같은 파일을 실제 패키지로 실행합니다.</p>
    </header>
    <SBtn
      v-if="!wide"
      id="recipe-menu-toggle"
      ref="menuToggle"
      class="recipe-menu-toggle"
      :aria-expanded="menuOpen"
      aria-controls="recipe-navigation"
      @click="toggleMenu"
      >예제 목록
      <svg
        class="sol-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        aria-hidden="true"
        focusable="false"
      >
        <path :d="solIconPaths.chevron" />
      </svg>
    </SBtn>

    <div class="recipe-browser">
      <aside
        v-show="wide || menuOpen"
        id="recipe-navigation"
        ref="navigation"
        class="recipe-navigation"
        @keydown="escape"
        @focusout="focusOut"
      >
        <nav aria-labelledby="recipe-list-title">
          <h2 id="recipe-list-title">예제 목록</h2>
          <section v-for="group in groups" :key="group.label" class="recipe-nav-group">
            <h3>{{ group.label }}</h3>
            <ul>
              <li v-for="id in group.items" :key="id">
                <a
                  :id="'recipe-link-' + id"
                  :ref="element => setLink(id, element)"
                  :href="href(id)"
                  :aria-current="selected === id ? 'page' : undefined"
                  @click="select($event, id)"
                  >{{ recipeLabels[id] }}</a
                >
              </li>
            </ul>
          </section>
        </nav>
      </aside>

      <section class="recipe-content" aria-labelledby="recipe-current-title">
        <div class="recipe-current-heading">
          <p class="starter-eyebrow">{{ currentGroup }}</p>
          <h2 id="recipe-current-title" ref="title" tabindex="-1">{{ recipeLabels[selected] }}</h2>
        </div>
        <component ref="recipeInstance" :is="current" :key="selected" v-bind="selected === 'layouts' && layoutPart ? {part:layoutPart} : {}" />
      </section>
    </div>
  </section>
</template>
