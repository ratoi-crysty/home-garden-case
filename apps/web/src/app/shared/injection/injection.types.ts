import { ProviderToken } from '@angular/core';

export type TokenType<T> = T extends ProviderToken<infer U> ? U : never;
