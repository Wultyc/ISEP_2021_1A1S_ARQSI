import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Lines Creation', function() {

  it('Create Lines test', function() {
    cy.visit('http://localhost:4200/lines');
    cy.get(':nth-child(2) > :nth-child(1) > .mat-focus-indicator').click();
    cy.get('#mat-input-1').type('LN1');
    cy.get('#mat-input-2').type('Line1');
    cy.get('#mat-input-3').type('Blue');
    cy.get(':nth-child(3) > .mat-focus-indicator').click();
   
  })
  
 
});