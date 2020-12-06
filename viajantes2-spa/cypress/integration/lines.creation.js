import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Lines Creation', function() {

  it('Create Lines test', function() {
    cy.visit('http://localhost:4200/');
    cy.get(':nth-child(3) > .mat-list-item-content').click();
    cy.get(':nth-child(2) > :nth-child(1) > .mat-focus-indicator').click();
    cy.get('#mat-input-1').type('LN1242');
    cy.get('#mat-input-2').type('Line14');
    cy.get('#mat-input-3').type('Blue');
     
    cy.get('#mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-14').click();
    cy.get('#mat-select-2 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-25').click();
    /*
    cy.get('#mat-select-6 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-41').click();
    cy.get('#mat-select-4 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-38').click();
    */
    cy.get(':nth-child(3) > .mat-focus-indicator').click();
    cy.get('.mat-button-wrapper > .mat-icon').click();
    cy.get('#mat-select-8 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-45').click();
    cy.get('#mat-select-10 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-62').click();
    cy.get('.mat-button-wrapper > .mat-icon').click();
    cy.get('#mat-select-12 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-74').click();
    cy.get('#mat-select-14 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-84').click();
    cy.get(':nth-child(5) > .mat-focus-indicator').click();
  })
});