/* Navigation uses component concepts. Export names remain the actual S API. */
export const componentConceptNames={
 STimeGrid:'Time Grid',
 SConfirmAction:'Confirm Action',SEmptyState:'Empty State',SLoadingOverlay:'Loading Overlay',SPagination:'Pagination',
 SCombobox:'Combobox',
 SMonthCalendar:'Month Calendar',
 SSortableList:'Sortable List',
 SChip:'Chip',SBadge:'Badge',SIcon:'Icon',SIconBtn:'Icon Button',
 SAccordion:'Accordion',SAlert:'Alert',SAutocomplete:'Autocomplete',SAvatar:'Avatar',
 SBarChart:'Chart',SBreadcrumbs:'Breadcrumbs',SBtn:'Button',SCard:'Card',
 SCheckbox:'Checkbox',SCol:'Column',SContainer:'Container',SContextMenu:'Context Menu',
 SDataTable:'Data Table',SDatePicker:'Date Picker',SDialog:'Dialog',SFileInput:'File Input',
 SForm:'Form',SMultiSelect:'Multi Select',SNumberInput:'Number Input',SPopover:'Popover',
 SProgressCircular:'Progress Circular',SProgressLinear:'Progress Linear',SRadioGroup:'Radio Group',
 SRangeSlider:'Range Slider',SResizableSplitPane:'Resizable Split Pane',SRow:'Row',
 SSegmentedControl:'Segmented Control',SSelect:'Select',SSnackbar:'Snackbar',SSplitBtn:'Split Button',
 SStepper:'Stepper',SSwitch:'Switch',STabs:'Tabs',STextarea:'Textarea',STextField:'Text Field',
 STimePicker:'Time Picker',STooltip:'Tooltip',STree:'Tree'
};
export const componentGroupNames={'동작':'Actions','입력':'Inputs','탐색':'Navigation','피드백':'Feedback','표시·레이아웃':'Display & Layout'};
export const componentGroupOrder=['Actions','Inputs','Navigation','Feedback','Display & Layout'];
export const componentLegacyAnchors={
 buttons:'sbtn',fields:'stext-field',choices:'sselect',feedback:'salert',dialog:'sdialog',
 selection:'sradio-group',help:'stooltip',accordion:'saccordion',navigation:'sbreadcrumbs',
 'advanced-inputs':'stextarea','content-tabs':'stabs','action-menu':'scontext-menu',
 'identity-progress':'savatar',progress:'sprogress-linear',time:'stime-picker',chart:'sbar-chart',
 tree:'stree',textarea:'stextarea',number:'snumber-input',multiselect:'smulti-select',avatar:'savatar'
};
export function componentConcept(component){return componentConceptNames[component.name]||component.name;}
export function componentConceptCatalogue(components){
 return componentGroupOrder.map(group=>({group,items:components.filter(component=>componentGroupNames[component.group]===group).map(component=>({id:component.id,label:componentConcept(component),apiName:component.name,description:component.description})).sort((a,b)=>a.label.localeCompare(b.label,'en'))}));
}
