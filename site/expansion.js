import {renderFoundation,mountFoundation} from './foundation.js';
import {renderLayouts,mountLayouts} from './layouts.js';
export function renderExpansion(route,h){return route==='style'?renderFoundation(h):route==='pattern'?renderLayouts(h):'';}
export function mountExpansion(root){const cleanup=[mountFoundation(root),mountLayouts(root)];return()=>cleanup.reverse().forEach(fn=>fn());}
