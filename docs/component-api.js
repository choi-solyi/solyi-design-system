import {componentReferences} from './component-api-data.js';
import {highlightSample} from './code-highlight.js';

const apiEscape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const componentGroups = ['동작','입력','탐색','피드백','표시·레이아웃'];
export function componentCatalogue() {
  return componentGroups.map(group => ({group,items:componentReferences.filter(component=>component.group===group).map(component=>({id:component.id,label:component.name,description:component.description}))}));
}
function apiTable(caption, columns, rows) {
  if (!rows.length) return '<p class="sol-hint">이 컴포넌트가 별도로 선언한 항목은 없습니다.</p>';
  return `<div class="api-table-scroll" tabindex="0" role="region" aria-label="${apiEscape(caption)}"><table class="api-table api-table--${columns.length}"><caption>${apiEscape(caption)}</caption><thead><tr>${columns.map(column=>`<th scope="col">${column}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}
export function renderComponentReferences(h) {
  return componentGroups.map((group,index)=>h.section('api-group-'+index,group,'기능 안에서는 컴포넌트 이름의 ABC 순서로 찾습니다.',
    componentReferences.filter(component=>component.group===group).map(component=>{
      const name=apiEscape(component.name),id=component.id;
      const href=`#${component.exampleRoute}/${component.example}`;
      return `<article class="component-reference sol-card" id="${id}" aria-labelledby="${id}-title">
        <div class="component-reference-heading"><h3 id="${id}-title">${name}</h3><a href="https://github.com/choi-solyi/solyi-design-system/blob/main/${component.source}">원본 소스 ↗</a></div>
        <p>${apiEscape(component.description)}</p>
        <nav class="component-reference-links" aria-label="${name} 문서"><a href="#component/${id}-examples">Examples</a><a href="#component/${id}-api">API</a></nav>
        <div id="${id}-examples" class="component-example-link"><h4>Examples</h4><p>기본 모양과 해당되는 선택·열림·오류 상태를 실제 패키지로 확인합니다. 여러 부품이 함께 쓰이는 예제는 같은 실행 화면을 공유합니다.</p><a class="sol-button" href="${href}">${name} 실행 예제 보기 →</a></div>
        <div id="${id}-api" class="component-api"><h4>API</h4>
          ${component.passthrough?`<p class="sol-notice info">${name}은 설치된 Vuetify의 <code>${apiEscape(component.passthrough)}</code>를 그대로 재사용합니다. 그 컴포넌트의 props·slots·이벤트·타입 계약을 유지합니다. 아래에 별도 S 전용 옵션을 만들지 않습니다.</p><p><a href="https://vuetifyjs.com/en/api/${component.passthrough.replace(/^V/,'v-').replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase()}/">Vuetify ${apiEscape(component.passthrough)} API ↗</a></p>`:''}
          <h5>Props</h5>${apiTable(name+' props',['이름 / 필수','타입 · 허용값','기본값','설명'],component.props.map(prop=>`<tr><th scope="row"><code>${apiEscape(prop.name)}</code>${prop.required?'<span class="api-required">필수</span>':''}</th><td><code>${apiEscape(prop.type)}</code>${prop.values.length?`<span class="sol-hint">${prop.values.map(apiEscape).join(' · ')}</span>`:''}</td><td><code>${apiEscape(prop.default)}</code></td><td>${apiEscape(prop.description)}</td></tr>`))}
          <h5>Slots</h5>${apiTable(name+' slots',['이름','전달 인자 타입','설명'],component.slots.map(slot=>`<tr><th scope="row"><code>${apiEscape(slot.name)}</code></th><td><code>${apiEscape(slot.scope)}</code></td><td>${apiEscape(slot.description)}</td></tr>`))}
          <h5>Events</h5>${apiTable(name+' events',['이름','인자 타입','설명'],component.events.map(event=>`<tr><th scope="row"><code>${apiEscape(event.name)}</code></th><td><code>${apiEscape(event.signature)}</code></td><td>${apiEscape(event.description)}</td></tr>`))}
          <h5>Methods</h5>${apiTable(name+' methods',['이름','공개 핸들 타입','설명'],component.methods.map(method=>`<tr><th scope="row"><code>${apiEscape(method.name)}</code></th><td><code>${apiEscape(method.signature)}</code></td><td>${apiEscape(method.description)}</td></tr>`))}
          ${component.types?.length?`<details class="api-type-definitions"><summary>자료·핸들 타입 정의</summary><pre tabindex="0" aria-label="${name} 자료 타입"><code>${highlightSample(component.types.map(type=>type.source).join('\n\n'),'TypeScript')}</code></pre></details>`:''}
          ${component.name==='SCard'?'<p class="sol-hint">SCard는 article 기반 표면입니다. VCard 래퍼가 아니며 variant·subtitle·image 같은 VCard 전용 옵션을 지원한다고 표시하지 않습니다. 선언하지 않은 속성·DOM 이벤트는 루트 article로 전달됩니다.</p>':''}
          <p class="sol-hint">이 표는 실제 구현에서 생성합니다. 명시된 S 계약과 모든 Vuetify 컴포넌트의 API가 같은 것은 아닙니다.</p>
        </div>
      </article>`;
    }).join(''))).join('');
}
