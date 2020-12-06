import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Vehicle Type Creation', function() {

  it('Create Vehicle Type test', function() {
    cy.visit('http://localhost:4200/');
    cy.get(':nth-child(5) > .mat-list-item-content').click();
    cy.get('app-vehicle-type.ng-star-inserted > :nth-child(2) > .mat-focus-indicator').click();
    cy.get('#mat-input-1').type('AutoBot2');
    cy.get('#mat-input-2').type(19);
    cy.get('#mat-input-3').type(20);
    cy.get('#mat-input-4').type(20);
    cy.get('#mat-input-5').type(100);
    cy.get('.mat-select-arrow-wrapper').click();
    cy.get('#mat-option-1').click();
    cy.get(':nth-child(4) > .mat-focus-indicator').click();
   
  })
  
 
});