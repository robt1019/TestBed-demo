import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';

import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // set up module for testing. Any code the test needs must be imported here. Any components or providers that will be tested
  // should be declared here
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  // This is needed to make NgModel update based on input events
  beforeEach(async(() => {
    fixture.detectChanges();
    fixture.whenStable();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form named loginForm', () => {
    expect(fixture.debugElement.query(By.css('form[name=loginForm]'))).toBeTruthy();
  });

  it('should have an input box of type text with the name username', () => {
    expect(fixture.debugElement.query(By.css('input[type="text"][name="username"]'))).toBeTruthy();
  });

  it('should have an input box of type password with the name password', () => {
    expect(fixture.debugElement.query(By.css('input[type="password"][name="password"]'))).toBeTruthy();
  });

  describe('loginButton', () => {

    let loginButton: DebugElement;

    beforeEach(() => {
      loginButton = fixture.debugElement.query(By.css('button[id=loginButton][type="submit"]'));
    });

    it('should have a button of type submit with id loginButton and text "Login"', () => {
      expect(loginButton).toBeTruthy();
      expect(loginButton.nativeElement.innerText).toEqual('Login');
    });

    it('should have a button that emits an event with a payload of username and password, based on form inputs', (done) => {

      const testUserDetails = {
        username: 'user01',
        password: 'superSweetPassword01!'
      };

      component.login.subscribe((data) => {
        expect(data).toEqual(testUserDetails);
        done();
      });

      const usernameInput = fixture.debugElement.query(By.css('input[name=username]')).nativeElement;
      const passwordInput = fixture.debugElement.query(By.css('input[name=password]')).nativeElement;

      usernameInput.value = testUserDetails.username;
      usernameInput.dispatchEvent(new Event('input'));
      passwordInput.value = testUserDetails.password;
      passwordInput.dispatchEvent(new Event('input'));

      loginButton.nativeElement.click();

      fixture.detectChanges();

    });
  });
});
