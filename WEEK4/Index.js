let message = "I love JavaScript!";
let language = message.slice(7, 17);
console.log(message.indexOf("o"))
console.log(language);  // JavaScript
const replacedstring = message.replace("JavaScript", "Python")
console.log(replacedstring)
const replacedAll = message.replaceAll("I love JavaScript", "I hate Python")
console.log(replacedAll)
let repeatedMessage = "I love JavaScript! ".repeat(3)
function greet(name){
    console.log("Hello, " +name+ " !"  )
}
function salute (position){
    console.log( `salute, ${position}!` );
}
salute("Colonel James")
function introduce(name, role){
    console.log(`Hey Guys, I am ${name}! and I am a ${role}!`)
}
introduce("Victor, Backend Developer")


function Developerintroduction(name,role,experience){
    console.log(`Good Afternnon Sir/Ma, My name is ${name}! and I am a ${role}!, I have had ${experience} years of experience`)

    if( experience >= 22){
        console.log("HE is permitted to work")
    }
    else{
        console.log("Don't let him in")
    }}
Developerintroduction("CHukwuma Simeon Ugochukwu", "Backend Programmer", "25")



function EmployeeEligibilitySystem(name,role,companyName,experience,performanceScore){
    console.log(`Hello Madam, my name is ${name}!,  I am a ${role}! aspiring to work in your company ${companyName}!,
         I have ${experience},
          I perofrmed very well in the just concluded exam with a performance score of ${performanceScore} `)
 if (experience >=5)
 console.log(`Congratulations ${name}! As a ${role}!, you qualify for promotion.`)
 if (experience>3 && performanceScore >=60)
    console.log(`${name}, you are eligible for further assessment.`)
 else{
    console.log( `sorry ${name}!  you do not qualify for promotion at this time.` )
 }
}
EmployeeEligibilitySystem("Chukwuma Simkkkn Ugochukwu","Software Engineering", "Rad 5 Tech Hub", 4, 2)
7


function maskEmail(email) {
  const atIndex = email.indexOf("@");
  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedMiddle = "*".repeat(localPart.length - 2);

}

const email = "thesimeons001@gmail.com";
console.log(maskEmail(email));



const str = '42';
const strToNum = +str;

console.log(strToNum); // 42
console.log(typeof str); // string
console.log(typeof strToNum); // number