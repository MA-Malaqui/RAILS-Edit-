import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

async function convertHtmlToPDF(htmlContent, filePath) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    // Save the PDF buffer to a file
    const currentDir = fileURLToPath(new URL(".", import.meta.url));
    writeFileSync(path.resolve(currentDir, filePath), pdfBuffer);
}

let campus = "EASTERN VISAYS CAMPUS";
let controlNumber = "2023-2023-001";
let schoolYeaar = "2023-2024";
let studentName = "Charles Joshua Uy";
let dateRequested = "TODAY";
let gradeSection = "11-C";
let numberOfStudents = 4;
let subject = "Research";
let concurrentTopic = "Developmental Research";
let unit = "Research Unit";
let teacherInCharge = "Rolex Padilla";
let venueOfExperiment = "Computer Science Laboratory";
let dateInclusiveDates = "TODAY";
let inclusiveTimeOfUse = "whole day";

const pageScript = fs.readFileSync(
    "./server/app/forms/addPageNumbers/page.polyfill.txt",
    "utf8",
);

let html =
    `<!doctype html>
<html lang="en">
<head>
<script>` +
    pageScript +
    `</script>
<style>
    * {
        font-family: "Calibri";
        font-size: 13.5px;
        margin: 0;
        padding: 0;
    }
    @page {
        size: A4;
        margin: 0;
        margin-top: 1.14in;
        margin-bottom: 1in;

        @bottom-left {
            margin-left:  0.73in;
            font-weight: bold;
            content: 'PSHS-00-F-CID-20-Ver02-Rev0-02/01/20';
        }

        @bottom-right {
            margin-right:  0.73in;
            font-weight: bold;
            content: 'page ' counter(page); /* ' of ' counter(pages) [inconsistently working]*/
        }
    }
    @media print {
        html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
        }
    }
    html, body {
        /*A4 Sizing (210mm x 297mm or 8.27in x 11.69in)*/
        width: 210mm !important;
        height: 297mm !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    #content {
        position: absolute;
        /*Taken through trial and errror*/
        width: 80%;
        margin-left: 0.73in;
    }
    h1 h2 {
        font-weight: bold;
    }
    #heading > h1 {
        margin-bottom: 0.02in; 
    }
    #title {
        margin-top: 0.21in;
        margin-bottom: 0.23in;
    }
    #tableId {
        width: 100%;
        text-align: right;
    }
    .input {
        font-weight: normal;
        border-bottom: 1px solid black;
    }
    #request {
        text-align: center;
    }
    #request td {
        border: 1px solid black;
        white-space: pre-wrap; /* allow wrapping of white space */
        word-wrap: break-word; /* break long words */
    }
    #request td:first-child {
        border-bottom: 1px solid black !important;
    }
    .request-header {
        vertical-align: top;
        border: 1px solid black;
    }
    .return {
        vertical-align: top;
        text-align: left;
        height: 1.05in;
    }
    ul {
        margin-left: 0.25in;
    }
    .italics {
        font-style: italic;
    }
    .groupmates {
        margin-left: 0.25in;
        width: 40%;
        table-layout: auto;
        font-style: italic;
    }
    .sigs-table {
        width: 90%;
        margin-top: 0.25in;
    }
    .sigs-input {
        text-align: center;
        width: 20%;
    }
    .sigs-gap {
        width: 10%;
    }
    .sigs-who {
        width: 11%;
    }
    .sigs-title {
        text-align: center;
    }
</style>
</head>
<body>
    <div id="content">
        <div id="heading">
            <h1>PHILIPPINE SCIENCE HIGH SCHOOL SYSTEM</h1>
            <h1>CAMPUS:&emsp;&emsp;<span class="input">&emsp;&emsp;${campus}&emsp;&emsp;</span></h1>
        </div>

        <h2 id="title">LABORATORY REQUEST AND EQUIPMENT ACCOUNTABILITY FORM</h2>
        <div id="tableId">
            Control No: <span class="input">${controlNumber}</span>
            &emsp;SY: <span class="input">${schoolYeaar}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        </div>
        
        <div id="table"></div>

        <ul class="italics">
            <li>Fill out this form completely and legibly; transact with the Unit SRA concerned during office hours.</li>
            <li>Requests not in accordance with existing Unit regulations and considerations may not be granted.</li>
        </ul>

        <table class="sigs-table">
            <tr>
                <td></td>
                <td id="studentSignature"></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td class="sigs-who">Requested By:</td>
                <td class="input sigs-input">${studentName}</td>
                <td class="sigs-gap"></td>
                <td class="sigs-who">Date Requested:</td> 
                <td class="input sigs-input">${dateRequested}</td>
            </tr>
            <tr>
                <td></td>
                <td class="sigs-title">Teacher/Student</td>
                <td class="sigs-gap"></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</body>
<script>
    // 585 is the row width
    let data = [
        {
            label: "Grade Level and Section",
            value: "${gradeSection}",
            minWidth: 375,
        },
        {
            label: "Number of Students",
            value: "${numberOfStudents}",
            minWidth: 210,
        },
        {
            label: "Subject",
            value: "${subject}",
            minWidth: 250,
        },
        {
            label: "Concurrent Topic",
            value: "${concurrentTopic}",
            minWidth: 335,
        },
        {
            label: "Unit",
            value: "${unit}",
            minWidth: 282,
        },
        {
            label: "Teacher In-Charge",
            value: "${teacherInCharge}",
            minWidth: 302,
        },
        {
            label: "Venue of Experiment",
            value: "${venueOfExperiment}",
            minWidth: 520,
        },
        {
            label: "Date/Inclusive Dates",
            value: "${dateInclusiveDates}",
            minWidth: 255,
        },
        {
            label: "Inclusive Time of Use",
            value: "${inclusiveTimeOfUse}",
            minWidth: 255,
        },
    ];

    // Create flex container
    let container = document.getElementById("table");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";

    // Iterate over data to create flex items
    for (let i = 0; i < data.length; i++) {
        // Create label item
        let labelItem = document.createElement("div");
        labelItem.textContent = data[i].label + ":";
        labelItem.style.marginRight = "15px"
        container.appendChild(labelItem);

        // Create value item
        let valueItem = document.createElement("div");
        valueItem.textContent = data[i].value;
        valueItem.style.borderBottom = "1px solid black";
        container.appendChild(valueItem);

        // Space
        let spaceItem = document.createElement("div");
        spaceItem.style.borderBottom = "1px solid black";

        let difference =
            data[i].minWidth -
            labelItem.offsetWidth -
            valueItem.offsetWidth;
        let offsetWidth = difference < 0 ? 0 : difference;

        spaceItem.style.minWidth = offsetWidth + "px";
        console.log(offsetWidth)
        container.appendChild(spaceItem);
    }
</script>
</html>
`;

// ---- END ----- //

console.log("STARTED");
await convertHtmlToPDF(html, "./sample.pdf");
console.log("DONE");
