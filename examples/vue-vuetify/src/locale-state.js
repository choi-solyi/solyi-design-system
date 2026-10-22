import {ref,computed} from 'vue';
export const starterLanguage=ref('ko-KR');
export const starterLocale=computed(()=>({code:starterLanguage.value}));
