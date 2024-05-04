# bcu23d-blockkedje-i-nodejs-individuell-inl-mningsuppgift-1

## Inlämningsuppgift

I den första inlämningen ska ni skapa en node.js applikation som ska efterlikna en blockkedje applikation. Valet av namn och syfte är upp till er själva.

### Godkänt krav

Applikationen ska byggas som ett REST API med endpoints för att kunna skapa block i en blockkedja. Det ska dessutom gå att lista alla block i en blockkedja samt hämta ut ett valfritt block ur blockkedjan.

- [x] Applikationen ska vara uppbyggd kring design mönstret MVC.
- [x] Felhantering enligt “best practice” ska användas(det som vi gått igenom)
- [x] Blockkedjan ska skrivas till en json fil så att den finns även efter omstart av servern.
- [x] Loggning av fel ska skrivas till en fysisk fellogg
- [x] ES6 moduler ska användas istället för CommonJS moduler.
- [ ] Skapandet av block ska ske test drivet(TDD)
- [ ] Varje block måste verifieras och valideras(“Proof Of Work”)

### Väl godkänt krav

- [x] För väl godkänt ska data i blocket vara av typen “complex object”, det vill säga antingen en instans av en klass eller ett anonymt objekt.
- [x] Centraliserad felhantering måste användas
- [x] Centraliserad loggning av applikationen måste användas

### Klient

Räcker med Postman.

---

### Inlämningsuppgiften examinerar följande läranderesultat från kursplanen:

- [x] API-utveckling med Node.js
- [ ] proof-of-work-baserade system
- [ ] skapa BackEnd Node.JS-servrar, med ett express-API och TDD

### VG-mål för uppgiften:

Den studerande har nått samtliga lärandemål för kursen. Den studerande kan dessutom:

- [x] skapa blockchain-objekt som hanterar komplexa objekt
- [x] förstå när du ska använda midleware och använda det på ett korrekt sätt

Med högre kvalitet än för betyget G.
