import convertHtmlToPdf from "../../app/forms/PDFconverter.js";
import makeAccountabilityForm from "../../app/forms/makeAccountabilityForm.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    convertHtmlToPdf(makeAccountabilityForm(body), "assets/pdftests/CID20.pdf");
    console.log("CREATED CID20.pdf at assets/pdftests/CID20.pdf");
    return "Completed";
});
