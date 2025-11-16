import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[cnpjMask]',
})
export class CnpjMaskDirective implements OnInit {
  private updatingView = false;
  private sub?: Subscription;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private rd: Renderer2,
    private ngControl: NgControl
  ) {}

  ngOnInit(): void {
    const ctrl = this.ngControl.control;
    if (ctrl) {
      this.applyMaskToView(String(ctrl.value || ''));

      this.sub = ctrl.valueChanges.subscribe((v) => {
        if (this.updatingView) return;
        this.applyMaskToView(String(v ?? ''));
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  @HostListener('input', ['$event'])
  onInput(ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value || '';
    const digits = raw.replace(/\D/g, '').slice(0, 14);
    const formatted = this.format(digits);

    this.updatingView = true;
    this.rd.setProperty(this.el.nativeElement, 'value', formatted);
    this.updatingView = false;

    this.ngControl.control?.setValue(digits, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur(): void {
    const digits = (this.ngControl.control?.value || '')
      .toString()
      .replace(/\D/g, '')
      .slice(0, 14);
    this.applyMaskToView(digits);
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text') ?? '';
    const digits = pasted.replace(/\D/g, '').slice(0, 14);
    this.applyMaskToView(digits);
    this.ngControl.control?.setValue(digits, { emitEvent: false });
  }

  private applyMaskToView(value: string): void {
    const digits = (value || '').replace(/\D/g, '').slice(0, 14);
    const formatted = this.format(digits);
    this.updatingView = true;
    this.rd.setProperty(this.el.nativeElement, 'value', formatted);
    this.updatingView = false;
  }

  private format(v: string): string {
    if (!v) return '';
    if (v.length <= 2) return v;
    if (v.length <= 5) return v.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
    if (v.length <= 8) return v.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    if (v.length <= 12)
      return v.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    return v.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/,
      '$1.$2.$3/$4-$5'
    );
  }
}
