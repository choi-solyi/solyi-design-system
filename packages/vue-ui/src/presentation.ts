import {computed,defineComponent,h,ref,watch} from 'vue';
import type {PropType} from 'vue';
import {SBtn} from './index';
import {formatSolNumber,useSolLocale} from './locale';
import type {SolLocale} from './locale';

export interface SBreadcrumbItem {id:string;label:string;href?:string;disabled?:boolean}
export const SBreadcrumbs=/* @__PURE__ */ defineComponent({name:'SBreadcrumbs',inheritAttrs:false,props:{items:{type:Array as PropType<readonly SBreadcrumbItem[]>,required:true},current:String,label:String,locale:Object as PropType<Partial<SolLocale>>},emits:{navigate:(_item:SBreadcrumbItem,_event:MouseEvent)=>true},setup(p,{attrs,emit}){
  const l=useSolLocale(()=>p.locale);
  return()=>h('nav',{...attrs,class:['sol-breadcrumbs sol-ui-breadcrumbs',attrs.class],'aria-label':p.label||l.value.breadcrumb},h('ol',p.items.map((item,index)=>{
    const current=p.current===undefined?index===p.items.length-1:item.id===p.current;
    return h('li',{key:item.id,'aria-current':current?'page':undefined},current?h('span',item.label):item.disabled?h('span',{'aria-disabled':'true'},item.label):item.href?h('a',{href:item.href,onClick:(event:MouseEvent)=>emit('navigate',item,event)},item.label):h(SBtn,{variant:'inline',onClick:(event:MouseEvent)=>emit('navigate',item,event)},()=>item.label));
  })));
}});

export const SAvatar=/* @__PURE__ */ defineComponent({name:'SAvatar',inheritAttrs:false,props:{label:{type:String,required:true},src:String,initials:String,size:{type:Number as PropType<24|32|40|48>,default:40}},emits:{error:(_event:Event)=>true},setup(p,{attrs,slots,emit}){
  const failed=ref(false);watch(()=>p.src,()=>failed.value=false);
  return()=>h('span',{...attrs,class:['sol-avatar sol-ui-avatar',attrs.class],role:'img','aria-label':p.label,style:{width:p.size+'px',height:p.size+'px'}},p.src&&!failed.value?h('img',{src:p.src,alt:'','aria-hidden':'true',onError:(e:Event)=>{failed.value=true;emit('error',e);}}):h('span',{'aria-hidden':'true'},slots.default?.()||p.initials||Array.from(p.label.trim()).slice(0,2).join('')));
}});

export interface SStep {id:string;label:string;description?:string;disabled?:boolean}
export const SStepper=/* @__PURE__ */ defineComponent({name:'SStepper',inheritAttrs:false,props:{id:{type:String,required:true},label:String,labelPosition:{type:String as PropType<'inline'|'below'>,default:'inline'},items:{type:Array as PropType<readonly SStep[]>,required:true},modelValue:{type:String as PropType<string|null>,default:null},completed:{type:Array as PropType<readonly string[]>,default:()=>[]},interactive:Boolean,disabled:Boolean,readonly:Boolean,locale:Object as PropType<Partial<SolLocale>>},emits:{'update:modelValue':(_id:string)=>true,change:(_id:string)=>true},setup(p,{attrs,emit}){
  const l=useSolLocale(()=>p.locale);
  const choose=(item:SStep)=>{if(p.interactive&&!p.disabled&&!p.readonly&&!item.disabled&&p.modelValue!==item.id){emit('update:modelValue',item.id);emit('change',item.id);}};
  return()=>h('nav',{...attrs,id:p.id,class:['sol-ui-stepper',attrs.class],'data-label-position':p.labelPosition,'aria-label':p.label||l.value.steps},h('ol',p.items.map((item,index)=>{
    const current=p.modelValue===item.id,done=p.completed.includes(item.id),content=()=>[
      h('span',{class:'sol-ui-step-number','aria-hidden':'true'},done?'✓':formatSolNumber(index+1,l.value)),
      h('span',{class:'sol-ui-step-copy'},[h('span',item.label),item.description?h('span',{class:'sol-hint'},item.description):null]),
      current||done?h('span',{class:'sol-ui-sr-only'},current?l.value.currentStep:l.value.completeStep):null
    ];
    return h('li',{key:item.id,'aria-current':current?'step':undefined,'data-state':current?'current':done?'complete':'upcoming'},[p.interactive?h(SBtn,{variant:'subtle',disabled:p.disabled||!!item.disabled,'aria-disabled':p.readonly?'true':undefined,onClick:()=>choose(item)},content):h('div',{class:'sol-ui-step-content','aria-disabled':item.disabled?'true':undefined},content()),index<p.items.length-1?h('span',{class:'sol-ui-step-connector','aria-hidden':'true'}):null]);
  })));
}});

export interface SBarChartItem {
  id: string
  label: string
  value: number
}
export type SChartType = 'bar' | 'line' | 'pie'

export const SBarChart = /* @__PURE__ */ defineComponent({
  name: 'SBarChart',
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    items: { type: Array as PropType<readonly SBarChartItem[]>, required: true },
    type: { type: String as PropType<SChartType>, default: 'bar' },
    max: Number,
    loading: Boolean,
    showTable: { type: Boolean, default: true },
    categoryLabel: String,
    valueLabel: String,
    locale: Object as PropType<Partial<SolLocale>>,
  },
  setup(p, { attrs }) {
    const l = useSolLocale(() => p.locale)
    const chart = ref<SVGSVGElement | null>(null)
    const chartWidth = ref(480)
    const limit = computed(() => p.max ?? Math.max(1, ...p.items.map((item) => item.value)))
    const valid = computed(
      () =>
        Number.isFinite(limit.value) &&
        limit.value > 0 &&
        p.items.every(
          (item) => Number.isFinite(item.value) && item.value >= 0 && item.value <= limit.value,
        ),
    )

    watch(
      chart,
      (element, _previous, onCleanup) => {
        if (!element) return
        const resize = (width: number) => {
          if (width > 0) chartWidth.value = width
        }
        resize(element.getBoundingClientRect().width)
        if (typeof ResizeObserver === 'undefined') return
        const observer = new ResizeObserver(([entry]) => {
          if (entry) resize(entry.contentRect.width)
        })
        observer.observe(element)
        onCleanup(() => observer.disconnect())
      },
      { flush: 'post' },
    )

    return () => {
      const plotWidth = Math.max(0, chartWidth.value - 32)
      const step = plotWidth / p.items.length
      const labelLimit = Math.max(1, Math.min(8, Math.floor((step - 8) / 12)))
      const total = p.items.reduce((sum, item) => sum + item.value, 0)
      const point = (index: number) => [16 + step * (index + 0.5), 164 - (p.items[index].value / limit.value) * 140]
      const category = (index: number) => `var(--sol-color-categorical-${index % 8 + 1}-foreground)`
      let angle = -Math.PI / 2
      const pie = () => total === 0
        ? [h('circle', { cx: chartWidth.value / 2, cy: 96, r: 72, fill: 'none', stroke: 'var(--sol-color-control-border)' })]
        : p.items.filter(item => item.value > 0).map(item => {
            const index = p.items.indexOf(item), ratio = item.value / total, start = angle
            angle += ratio * Math.PI * 2
            const cx = chartWidth.value / 2, cy = 96, radius = 72
            const position = (value: number) => `${cx + radius * Math.cos(value)} ${cy + radius * Math.sin(value)}`
            const label = `${index + 1}. ${item.label}: ${formatSolNumber(item.value, l.value)}`
            return h('g', { key: item.id }, [
              ratio >= 1 ? h('circle', { cx, cy, r: radius, fill: category(index) }, h('title', label))
                : h('path', { d: `M ${cx} ${cy} L ${position(start)} A ${radius} ${radius} 0 ${ratio > 0.5 ? 1 : 0} 1 ${position(angle)} Z`, fill: category(index), stroke: 'var(--sol-color-surface)', 'stroke-width': 1 }, h('title', label)),
              h('text', { x: cx + radius * .65 * Math.cos(start + ratio * Math.PI), y: cy + radius * .65 * Math.sin(start + ratio * Math.PI), 'text-anchor': 'middle', 'dominant-baseline': 'middle', fill: `var(--sol-color-categorical-${index % 8 + 1}-background)`, 'font-size': 12 }, String(index + 1)),
            ])
          })

      return h(
        'figure',
        {
          ...attrs,
          id: p.id,
          class: ['sol-ui-bar-chart', attrs.class],
          'data-chart-type': p.type,
          'aria-labelledby': p.id + '-caption',
          'aria-busy': String(p.loading),
        },
        [
          h('figcaption', { id: p.id + '-caption' }, p.label),
          p.loading
            ? h('p', { role: 'status' }, l.value.tableLoading)
            : !valid.value || p.type === 'pie' && !Number.isFinite(total)
              ? h('p', { role: 'alert' }, l.value.chartInvalid)
              : !p.items.length
                ? h('p', { role: 'status' }, l.value.tableEmpty)
                : [
                    h(
                      'svg',
                      {
                        ref: chart,
                        viewBox: `0 0 ${chartWidth.value} 200`,
                        role: 'img',
                        'aria-labelledby': p.id + '-svg-title',
                        preserveAspectRatio: 'xMidYMid meet',
                      },
                      [
                        h('title', { id: p.id + '-svg-title' }, p.label),
                        ...(p.type === 'pie' ? pie() : [
                        h('line', {
                          x1: 16,
                          y1: 164,
                          x2: 16 + plotWidth,
                          y2: 164,
                          stroke: 'var(--sol-color-control-border)',
                        }),
                        p.type === 'line' ? h('polyline', { points: p.items.map((_item, index) => point(index).join(',')).join(' '), fill: 'none', stroke: 'var(--sol-color-accent)', 'stroke-width': 2 }) : null,
                        ...p.items.map((item, index) => {
                          const width = Math.min(48, step * 0.6)
                          const x = 16 + step * (index + 0.5)
                          const height = (item.value / limit.value) * 140
                          const characters = Array.from(item.label)
                          const label =
                            characters.length > labelLimit
                              ? characters.slice(0, labelLimit - 1).join('') + '…'
                              : item.label

                          return h('g', { key: item.id }, [
                            p.type === 'line' ? h('circle', { cx: x, cy: 164 - height, r: 4, fill: 'var(--sol-color-accent)' }) : h('rect', {
                              x: x - width / 2,
                              y: 164 - height,
                              width,
                              height,
                              fill: 'var(--sol-color-accent)',
                            }),
                            h(
                              'text',
                              {
                                x,
                                y: Math.max(14, 156 - height),
                                'text-anchor': 'middle',
                                class: 'sol-ui-chart-value',
                              },
                              formatSolNumber(item.value, l.value),
                            ),
                            h(
                              'text',
                              {
                                x,
                                y: 188,
                                'text-anchor': 'middle',
                                class: 'sol-ui-chart-label',
                              },
                              label,
                            ),
                          ])
                        }),
                        ]),
                      ],
                    ),
                    p.type === 'pie' ? h('ol', { class: 'sol-ui-chart-legend' }, p.items.map((item, index) => h('li', { key: item.id }, [h('span', { 'aria-hidden': 'true', class: 'sol-ui-chart-swatch', style: { background: category(index) } }), `${item.label}: ${formatSolNumber(item.value, l.value)}`]))) : null,
                    h(
                      'table',
                      { class: ['sol-ui-chart-table', p.showTable ? '' : 'sol-ui-sr-only'] },
                      [
                        h('caption', p.label),
                        h(
                          'thead',
                          h('tr', [
                            h('th', { scope: 'col' }, p.categoryLabel || l.value.chartCategory),
                            h('th', { scope: 'col' }, p.valueLabel || l.value.chartValue),
                          ]),
                        ),
                        h(
                          'tbody',
                          p.items.map((item) =>
                            h('tr', { key: item.id }, [
                              h('th', { scope: 'row' }, item.label),
                              h('td', formatSolNumber(item.value, l.value)),
                            ]),
                          ),
                        ),
                      ],
                    ),
                  ],
        ],
      )
    }
  },
})
