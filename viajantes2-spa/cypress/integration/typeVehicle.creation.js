import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Node Creation', function() {

  it('Create Vehicle Type test', function() {
    cy.visit('http://localhost:4200/vehicle-types');
    cy.get('app-vehicle-type.ng-star-inserted > :nth-child(2) > .mat-focus-indicator').click();
    cy.get('#mat-input-1').type('ShortName20');
    cy.get('#mat-input-2').type('NodeName20');
    cy.get('#mat-input-3').type(20);
    cy.get('#mat-input-4').type(20);
    cy.get('#mat-input-5').type(100);
    cy.get('.mat-select-arrow').click();
    cy.get('#mat-option-3').click();
    cy.get(':nth-child(4) > .mat-focus-indicator').click();
   
  })
  
 
});