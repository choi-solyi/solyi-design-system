import {renderFoundation,mountFoundation} from './foundation.js';
import {renderLayouts,mountLayouts} from './layouts.js';
import {renderAdvancedInputs,mountAdvancedInputs} from './inputs.js';
import {renderWorkflow,mountWorkflow,confirmWorkflowLeave} from './workflow.js';
export function renderExpansion(route,h){return route==='style'?renderFoundation(h):route==='pattern'?renderLayouts(h)+renderWorkflow(h):route==='component'?renderAdvancedInputs(h):'';}
export function mountExpansion(root,announce){const cleanup=[mountFoundation(root),mountLayouts(root),mountAdvancedInputs(root),mountWorkflow(root,announce)];return()=>cleanup.reverse().forEach(fn=>fn());}
export function requestExpansionLeave(){return confirmWorkflowLeave();}
