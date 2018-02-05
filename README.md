# WEBS5 Demo Hoorcollege week 2
De demo zoals die in het hoorcollege gegeven is.

Zorg voor de start van de demo er voor dat je database runt (mongod.exe).
Start de applicatie middels _npm start_ of _nodemon_.

### Rest en express
We gebruiken in deze demo Express om een restful API te tonen. Je kan deze code bekijken, maar het is nog niet nodig om deze te begrijpen.

## Mongoose schema's
1. Open _/models/teacher.js_
2. Mongoose verwacht een schema. Deze kan je als volgt definiëren
```javascript
var teacherSchema = new mongoose.Schema({});
mongoose.model('Teacher', teacherSchema);
```
3. Het schema moet nu uitgebreid worden met properties.
    Vervang daarom het teacherschema met het volgende:
```javascript
var teacherSchema = new mongoose.Schema({
	_id: { type: String},
	firstName: { type: String },
	middleName: { type: String },
	lastName: { type: String },
	age: { type: Number },
	isActive: { type: Boolean },
	courses: [{ type: String }]
});
```
4. Open _Postman_ en post de volgende body naar http://localhost:3000/teachers
Je ziet dat dit goed gaat, dit willen we niet omdat de teacher nu een in onze ogen invalide object is.
```javascript
{
	"_id": "test"
}
```
5. We gaan het schema uitbreiden met inline validaties. Denk aan _required, lowercase, min en max_
Vervang je schema door het volgende: 
```javascript
var teacherSchema = new mongoose.Schema({
	// Schema including validation
	_id: { type: String, required: true, lowercase: true },
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	age: {type: Number, min: 0, max: 100 },
	isActive: { type: Boolean},
	courses: [{ type: String, required: true }]
});
```
6. Als we nu stap 4 opnieuw uitvoeren zul je zien dat je een foutmelding krijgt.

## Pseudo-joins
1. We willen een pseudo-join uitvoeren. We willen de courses bij teachers kunnen ophalen.
Geef dan bij je teacher aan dat hij verwijst naar courses.
```javascript
courses: [{ type: String, required: true, ref: 'Course' /* Pseudo-joins */ }]
```
2. Als je een nieuw _GET-request_ doet dan zie je nog geen verschil. We moeten hem namelijk nog aangeven dat de course meegeladen moet worden.
Open _/routes/teachers.js_ en geef op regel 15 aan dat de courses gepopulated dienen te worden.
```javascript
var result = Teacher.find(query)
                .populate('courses');
```
3. Nu zul je bij een _GET-request_ wel de courses opgehaald zien worden.

## (Extra) validatie-mogelijkheden
1. We kunnen nog extra validaties op paden uitvoeren. Dit doe je voornamelijk als je afhankelijke properties hebt.
In het volgende voorbeeld mag je achternaam bijvoorbeeld niet hetzelfde als je voornaam zijn.
```javascript 
// Validation
teacherSchema.path('lastName').validate(function (val) {
    return val && this.firstName != val;
}, 'Last name must differ from first name.');
```

## Virtuals
1. We kunnen berekende eigenschappen in onze objecten toevoegen. Dit zijn eigenschappen die niet in de database staan opgeslagen, maar wel teruggeven worden.
Denk bijvoorbeeld aan een leeftijd op basis van een geboortedatum of een full name.
Voeg de volgende code toe aan je teacher:
```javascript
// Virtuals
teacherSchema.virtual('fullName').get(function(){
	var fullName = this.firstName + ' ';
	if(this.middleName && this.middleName.length){
		fullName += this.middleName + ' ';
	}
	fullName += this.lastName;

	return fullName;
});	
```
2. Als je nu een _GET-request_ uitvoert zal je zien dat je deze property niet terugkrijgt.
Voeg daarom aan je schema toe dat hij je virtuals wél in een JSON-object moet bijvoegen.
```javascript
var teacherSchema = new mongoose.Schema({
	// Hier staan al je eigenschappen.
},
// settings:
{
	toObject: { virtuals: true },
	toJSON: { virtuals: true }
});
```

## Query builder
1. We kennen al de query builders van het Entity Framework en JQuery. Hier kan je methodes achter elkaar chainen om het op het eind pas uit te voeren.
Mongoose heeft deze mogelijkheid ook. Denk bijvoorbeeld aan het volgende:
```javascript
Teacher.find({ firstName: 'Martijn'})
	.sort({ _id: 1 })
	.limit(pageSize)
	.skip(pageIndex * pageSize)
    .exec(/* function met resultaat */);
```
2. Deze kunnen we uitbreiden met custom query methodes. Bovenstaande code biedt bijvoorbeeld pagination aan.
Hier kunnen we een eigen query method voor maken. Voeg de onderstaande code toe aan het TeacherSchema.
```javascript
// Custom query function.
teacherSchema.query.byPage = function (pageSize, pageIndex) {
    return this.find()
        .limit(parseInt(pageSize))
        .skip(pageIndex * pageSize);
};
```
**Merk op dat we eerst een find() doen. Dit heeft geen effect op eerdere filters, dit is enkel nodig om een query-object te krijgen.**

3. Je kan nu in _/routes/teachers.js_ je query uitbreiden. Dit hoeft niet eens na elkaar, je kan bijvoorbeeld eerst je parameters checken.
```javascript
if (req.query.pageSize && req.query.pageIndex) {
    result = result.byPage(req.query.pageSize, req.query.pageIndex);
}
```

## Middleware
Je kan je eigen middleware schrijven. Dit wordt uitgevoerd voor of na bepaalde acties.
In ons voorbeeld is dit vóór het opslaan, maar je kan je misschien wel voorstellen dat nadat bijvoorbeeld User-object geassocieerd wordt met een nieuwe rol je de administrator een mailtje stuurt ter informatie.
1. Voeg de volgende code toe aan je teacherschema:
```javascript
// Middleware
teacherSchema.pre('save', function(next){
	console.log('Teacher will be saved');
	next();
	console.log('Teacher is saved');
});
```
2. Probeer nu een teacher op te slaan. Je zal zien dat je logs te zien zijn in je console.

## Conclusie
Met MongooseJS kan je dus enorm veel logica van je applicatie in je models kwijt. Het idee is dus ook dat je in je routes weinig doet en dit voornamelijk op deze laag laat afhandelen.

MongooseJS is nog veel rijker dan bovengenoemde voorbeelden. Kijk voor de volledige documentatie daarom op http://mongoosejs.com/docs/guide.html