/* Keep the two documentation shell dialogs' Tab boundaries predictable. Escape remains available. */
export function containShellDialogTab(event,panel){
 if(event.key!=='Tab'||event.altKey||event.ctrlKey||event.metaKey||event.isComposing)return false;
 const controls=Array.from(panel.querySelectorAll('button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),a[href]')).filter(e=>!e.closest('[hidden]'));
 const first=controls[0],last=controls.at(-1),active=panel.ownerDocument.activeElement;
 if((event.shiftKey&&active===first)||(!event.shiftKey&&active===last)){event.preventDefault();(event.shiftKey?last:first)?.focus();return true;}return false;
}
