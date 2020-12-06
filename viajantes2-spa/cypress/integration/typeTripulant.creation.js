import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Node Creation', function() {

  it('Create Tripulant Type test', function() {
    cy.visit('http://localhost:4200/tripulant-types');
    cy.get('app-tripulant-type.ng-star-inserted > :nth-child(2) > .mat-focus-indicator').click();
    cy.get('#mat-input-1').type('Passageiro');
    cy.get(':nth-child(4) > .mat-focus-indicator').click();
   
  })
  
 
});