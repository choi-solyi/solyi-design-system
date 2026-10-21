import {renderFoundation,mountFoundation} from './foundation.js';
import {renderLayouts,mountLayouts} from './layouts.js';
import {renderAdvancedInputs,mountAdvancedInputs} from './inputs.js';
export function renderExpansion(route,h){return route==='style'?renderFoundation(h):route==='pattern'?renderLayouts(h):route==='component'?renderAdvancedInputs(h):'';}
export function mountExpansion(root){const cleanup=[mountFoundation(root),mountLayouts(root),mountAdvancedInputs(root)];return()=>cleanup.reverse().forEach(fn=>fn());}
