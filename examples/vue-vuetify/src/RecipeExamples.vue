<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { SBtn } from '@solyi/vue-ui';
import { solIconPaths } from '@solyi/core/icons';
import { recipeComponents, recipeLabels } from './recipe-registry';

type RecipeId = keyof typeof recipeComponents;
const groups: { label: string; items: RecipeId[] }[] = [
  { label: '기본 표현', items: ['color-examples', 'writing', 'buttons', 'fields', 'choices', 'feedback'] },
  { label: '입력과 선택', items: ['selection', 'advanced-inputs', 'inputs', 'time', 'form', 'composition', 'error-summary'] },
  { label: '탐색과 오버레이', items: ['dialog', 'help', 'accordion', 'navigation', 'content-tabs', 'action-menu'] },
  { label: '자료와 상태', items: ['data', 'search', 'compare', 'empty', 'responses', 'progress', 'chart-tree'] },
  { label: '화면과 작업 흐름', items: ['layouts', 'workflow', 'bulk-recovery', 'identity-progress'] },
];
const media = window.matchMedia('(min-width: 1100px)');
const wide = ref(media.matches);
const menuOpen = ref(false);
const navigation = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const selected = ref<RecipeId>(readSelection());
const current = computed(() => recipeComponents[selected.value]);
const currentGroup = computed(() => groups.find(group => group.items.includes(selected.value))?.label);

function readSelection(): RecipeId {
  const value = new URLSearchParams(location.search).get('example');
  return value && Object.hasOwn(recipeComponents, value) ? value as RecipeId : 'buttons';
}
function href(id: RecipeId): string {
  const url = new URL(location.href);
  url.searchParams.set('example', id);
  return url.pathname + url.search + url.hash;
}
function revealSelection() {
  const list = navigation.value;
  const item = document.getElementById('recipe-link-' + selected.value);
  if (!list || !item || (!wide.value && !menuOpen.value)) return;
  const box = list.getBoundingClientRect();
  const row = item.getBoundingClientRect();
  if (row.top < box.top + 8) list.scrollTop -= box.top + 8 - row.top;
  else if (row.bottom > box.bottom - 8) list.scrollTop += row.bottom - box.bottom + 8;
}
async function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) { await nextTick(); revealSelection(); }
}
async function showExample(id: RecipeId) {
  selected.value = id;
  menuOpen.value = false;
  await nextTick();
  title.value?.focus();
  revealSelection();
}
function select(event: MouseEvent, id: RecipeId) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (selected.value !== id) history.pushState(null, '', href(id));
  void showExample(id);
}
function restoreHistory() { void showExample(readSelection()); }
function closeMenu(restore = false) {
  menuOpen.value = false;
  if (restore) nextTick(() => document.getElementById('recipe-menu-toggle')?.focus());
}
function escape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || wide.value || !menuOpen.value) return;
  event.preventDefault();
  event.stopPropagation();
  closeMenu(true);
}
function outside(event: Event) {
  const target = event.target as Node;
  if (!wide.value && menuOpen.value && !navigation.value?.contains(target) &&
      !document.getElementById('recipe-menu-toggle')?.contains(target)) closeMenu();
}
function focusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null;
  if (next && !navigation.value?.contains(next) &&
      next !== document.getElementById('recipe-menu-toggle')) closeMenu();
}
function resize(event: MediaQueryListEvent) {
  const focusedInList = navigation.value?.contains(document.activeElement);
  const focusedToggle = document.activeElement?.id === 'recipe-menu-toggle';
  wide.value = event.matches;
  menuOpen.value = !event.matches && !!focusedInList;
  if (event.matches && focusedToggle) nextTick(() =>
    document.getElementById('recipe-link-' + selected.value)?.focus());
}
onMounted(() => {
  if (new URLSearchParams(location.search).get('example') !== selected.value)
    history.replaceState(null, '', href(selected.value));
  window.addEventListener('popstate', restoreHistory);
  media.addEventListener('change', resize);
  document.addEventListener('pointerdown', outside);
  nextTick(revealSelection);
});
onBeforeUnmount(() => {
  window.removeEventListener('popstate', restoreHistory);
  media.removeEventListener('change', resize);
  document.removeEventListener('pointerdown', outside);
});
</script>

<template>
  <section class="recipe-explorer">
    <header>
      <h1>Vue 사용 예제</h1>
      <p>분류에서 예제를 골라 확인하세요. 문서의 코드와 같은 파일을 실제 패키지로 실행합니다.</p>
    </header>
    <SBtn
      v-if="!wide"
      id="recipe-menu-toggle"
      class="recipe-menu-toggle"
      :aria-expanded="menuOpen"
      aria-controls="recipe-navigation"
      @click="toggleMenu"
    >예제 목록
      <svg class="sol-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path :d="solIconPaths.chevron" /></svg>
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
                  :href="href(id)"
                  :aria-current="selected === id ? 'page' : undefined"
                  @click="select($event, id)"
                >{{ recipeLabels[id] }}</a>
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
        <component :is="current" :key="selected" />
      </section>
    </div>
  </section>
</template>
