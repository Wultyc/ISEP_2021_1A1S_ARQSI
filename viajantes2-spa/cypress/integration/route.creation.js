import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Route Creation', function() {

  it('Create Route Type', function() {
    cy.visit('http://localhost:4200/');
    cy.get(':nth-child(2) > .mat-list-item-content').click();
    cy.get('app-routes.ng-star-inserted > :nth-child(2) > .mat-focus-indicator').click();
    cy.get('.example-section > .mat-button').click();
    cy.get('.example-section > .mat-button').click();
    cy.get('#mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-1').click();
    cy.get('#mat-select-2 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
    cy.get('#mat-option-22').click();
    cy.get('#mat-input-1').type(5);
    cy.get('#mat-input-2').type(7);
    cy.get(':nth-child(6) > .mat-focus-indicator').click();
    
  })
  
 
});