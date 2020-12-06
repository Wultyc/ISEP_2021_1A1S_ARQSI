import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Tripulant Type Creation', function() {

  it('Create Tripulant Type test', function() {
    cy.visit('http://localhost:4200/');
    cy.get(':nth-child(4) > .mat-list-item-content').click();
    cy.get('app-tripulant-type.ng-star-inserted > :nth-child(2) > .mat-focus-indicator').click();
    cy.get('#mat-input-1').type('Passageiro2');
    cy.get(':nth-child(4) > .mat-focus-indicator').click();
   
   
  })
  
 
});