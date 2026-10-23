import { SForm, STextField, SContainer, SRow, SCol, sRules } from 'solyi-ui';
import { VContainer } from 'vuetify/components/VGrid';
import type { SFormHandle, SFormResult, SFieldHandle, SRule } from 'solyi-ui';

type FormProps = InstanceType<typeof SForm>['$props'];
type FieldProps = InstanceType<typeof STextField>['$props'];
type RowProps = InstanceType<typeof SRow>['$props'];
type ColProps = InstanceType<typeof SCol>['$props'];
type ContainerProps = InstanceType<typeof SContainer>['$props'];

const rules: SRule[] = [sRules.required('필수 입력입니다.'), sRules.minLength(3)];
const field: FieldProps = {
  id: 'name',
  label: '이름',
  rules,
  serverError: '가상 서버 오류',
  errorMessages: ['가상 오류'],
};
const form: FormProps = { disabled: false, readonly: false };
const row: RowProps = { align: 'center', justify: 'space-between', noGutters: true };
const col: ColProps = { cols: 12, md: 6 };
const container: ContainerProps = { fluid: true, tag: 'section' };
const sameContainer: typeof VContainer = SContainer;

// @ts-expect-error A Vue value is not a validation function.
const invalidRule: SRule = 'required';
// @ts-expect-error Rules return a message or boolean, never an async promise.
const asyncRule: SRule = async () => true;
// @ts-expect-error Grid alignment is the actual Vuetify union, not an arbitrary string.
const invalidRow: RowProps = { align: 'diagonal' };

export async function checkFormContract(handle: SFormHandle, fieldHandle: SFieldHandle) {
  const result: SFormResult = await handle.validate();
  handle.focus();
  handle.resetValidation();
  const valid: boolean = fieldHandle.validate();
  fieldHandle.focus();
  fieldHandle.resetValidation();
  return { result, valid };
}
void [field, form, row, col, container, sameContainer, invalidRule, asyncRule, invalidRow];
