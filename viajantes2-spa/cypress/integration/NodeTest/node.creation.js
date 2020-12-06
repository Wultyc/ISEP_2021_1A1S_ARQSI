import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPlatform } from '@angular/core';


describe('Testing Node Creation', function() {

  it('Create Node test', function() {
    cy.visit('http://localhost:4200/');
    cy.get(':nth-child(1) > .mat-list-item-content').click();
    cy.get('#mat-input-0').type('Node2123');
    cy.get(' app-nodes.ng-tns-c153-1 > :nth-child(2) > .mat-focus-indicator').click();
    cy.get('#mat-input-1').type('ShortName20');
    cy.get('#mat-input-2').type('NodeName20');
    cy.get('#mat-input-3').type(20);
    cy.get('#mat-input-4').type(20);
   // cy.get('#mat-slide-toggle-1 > .mat-slide-toggle-label > .mat-slide-toggle-bar').click();
   // cy.get('#mat-slide-toggle-2 > .mat-slide-toggle-label > .mat-slide-toggle-bar').click();
    cy.get(':nth-child(4) > .mat-focus-indicator').click();
   
  })
  
 
});