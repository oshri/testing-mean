import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NotFoundComponent } from './notFound.component';

describe('NotFoundComponent', () => {
	let component: NotFoundComponent;
	let fixture: ComponentFixture<NotFoundComponent>;
	let messageContainer: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NotFoundComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NotFoundComponent);
		component = fixture.componentInstance;
		messageContainer = fixture.debugElement.query(By.css('.message'));

		fixture.detectChanges();
	});

	it('should compile', () => {
		expect(fixture).toMatchSnapshot();
	});

	it('should create the NotFoundComponent', async(() => {
		const notFound = fixture.debugElement.componentInstance;
		expect(notFound).toBeTruthy();
	}));

	it('should render 404 description', async(() => {
		const messageDe = messageContainer.query(By.css('p'));
		const p: HTMLElement = messageDe.nativeElement;
		expect(p.textContent).toContain("Sorry ! the page you are looking for can't be found");
	}));
});
