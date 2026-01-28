import type { InjectionKey } from 'vue';

interface CheckoutActions {
  validateShipping: () => Promise<void>;
  validatePayment: () => Promise<void>;
}

export const CheckoutActionsKey: InjectionKey<CheckoutActions> = Symbol('checkoutActions');