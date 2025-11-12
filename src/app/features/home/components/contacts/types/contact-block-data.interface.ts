import { TemplateRef } from '@angular/core';

export interface ContantBlockData {
  emoji: string;
  title: string;
  hint: string;
  template: TemplateRef<unknown> | null;
}
