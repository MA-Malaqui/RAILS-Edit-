<script setup>
import dayjs from "dayjs";

const user = inject("user");

const requests = await useFetch("/api/user/teacher/getAllStudentRequests", {
    method: "POST",
    body: user,
});

const studentRequests = ref(requests.data.value);

async function updateTable() {
    const requests = await useFetch("/api/user/teacher/getAllStudentRequests", {
        method: "POST",
        body: user,
    });
    studentRequests.value = requests.data.value;
}

async function downloadRequest(id) {
    const pdfBuffersRawData = await useFetch("/api/forms/create-pdf-buffers", {
        method: "POST",
        body: { id, requestedForms: [5, 19, 20] },
    });

    const pdfBuffers = pdfBuffersRawData.data.value;
    downloadPDF(pdfBuffers, user.lastName);
}

function downloadPDF(pdfBuffers, lastname) {
    for (const property in pdfBuffers) {
        const buffer = pdfBuffers[property].data;
        const url = window.URL.createObjectURL(
            new Blob([new Uint8Array(buffer).buffer]),
        );
        const link = document.createElement("a");
        link.href = url;
        const filename = `${lastname}-${property}-Request.pdf`;

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
    }
}

const editRequestModalIsOpen = ref(false);
const currentOpenRequest = ref(null);
function openEditRequestModal(request) {
    currentOpenRequest.value = request;
    editRequestModalIsOpen.value = true;
}
async function approve() {
    editRequestModalIsOpen.value = false;
    await useFetch("/api/user/teacher/approveRequest", {
        method: "POST",
        body: { ...currentOpenRequest.value, user },
    });
    updateTable();
}
async function decline() {
    editRequestModalIsOpen.value = false;
    await useFetch("/api/user/teacher/declineRequest", {
        method: "POST",
        body: currentOpenRequest.value,
    });
    updateTable();
}
</script>

<template>
    <div>
        <h1 class="mb-2 text-xl font-bold">STUDENT REQUESTS</h1>
        <table class="w-[100%] table-auto text-left">
            <thead>
                <tr>
                    <th class="border-2 px-4 py-2 text-center">
                        Date Requested
                    </th>
                    <th class="border-2 px-4 py-2 text-center">Subject</th>
                    <th class="border-2 px-4 py-2 text-center">
                        Grade Section
                    </th>
                    <th class="border-2 px-4 py-2 text-center">Requestor</th>
                    <th class="border-2 px-4 py-2 text-center">
                        No. of People
                    </th>
                    <th class="border-2 px-4 py-2 text-center">
                        Teacher Approved
                    </th>
                    <th class="border-2 px-4 py-2 text-center">
                        Admin Approved
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="request in studentRequests"
                    :key="request.id"
                    class="text-center"
                >
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{
                            dayjs(request.createdAt).format(
                                "MMM DD, YYYY - HH:mm",
                            )
                        }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.forSubject }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.gradeSection.grade }} -
                        {{ request.gradeSection.section }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.requestor.lastName }},
                        {{ request.requestor.firstName }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.noOfStudents }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.isSignedByTeacher }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.isSignedByAdmin }}
                    </td>
                    <td class="px-2">
                        <UButton
                            label="Download"
                            variant="outline"
                            @click="downloadRequest(request.id)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <UModal v-model="editRequestModalIsOpen">
            <UCard>
                <template #header></template>

                <pre>
                    {{ currentOpenRequest }}
                </pre>

                <template #footer>
                    <div>
                        <UButton
                            label="DECLINE"
                            color="red"
                            variant="outline"
                            @click="decline()"
                        />
                        <UButton
                            label="APPROVE"
                            color="green"
                            class="ml-3"
                            @click="approve()"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
