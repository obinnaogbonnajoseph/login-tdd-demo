import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { element, ElementHelper } from 'protractor';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let querySelector: Function;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const element = fixture.nativeElement;

    // create a query selector method
    querySelector = (inputValue: string): any => {
      return element.querySelector(inputValue)
    }
  });

  it('should render form with email and password inputs', () => {

    expect(querySelector('form')).toBeTruthy();
    expect(querySelector('#email')).toBeTruthy();
    expect(querySelector('#password')).toBeTruthy();
    expect(querySelector('button')).toBeTruthy();
  })

  it('should return model invalid when form is empty', () => {
    expect(component.form.valid).toBeFalsy();
  })

  it('should validate email input as required', () => {
    const email = component.form.controls.email;

    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
  })

  it('should validate password input as required', () => {
    const password = component.form.controls.password;

    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  })

  it('should validate email format', () => {
    const email = component.form.controls.email;
    email.setValue('test');
    const errors = email.errors;

    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeTruthy();
    expect(email.valid).toBeFalsy();
  })

  it('should validate email format correctly', () => {
    const email = component.form.controls.email;
    email.setValue('test@test.com');
    const errors = email.errors || {};

    expect(email.valid).toBeTruthy();
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();
  })

  it('should render email validation message when formControl is submitted and invalid', () => {
    expect(querySelector('#email-error')).toBeFalsy();

    component.onSubmit();

    fixture.detectChanges();
    expect(querySelector('#email-error')).toBeTruthy();
    expect(querySelector('#email-error').textContent).toContain('Please enter a valid email');
  })
});