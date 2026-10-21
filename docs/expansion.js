import {renderFoundation,mountFoundation} from './foundation.js';
export function renderExpansion(route,h){return route==='style'?renderFoundation(h):'';}
export function mountExpansion(root){const cleanup=[mountFoundation(root)];return()=>cleanup.reverse().forEach(fn=>fn());}
