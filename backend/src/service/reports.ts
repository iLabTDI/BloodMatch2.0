import { createReport,getReports, deleteReport } from "../models/reports";
import { getUserByEmail } from "../models/user";
import { Report } from "../interface/reports";
import { throwModelError } from "../utils/error.handle";

export const registerReport = async (report: Report) => {

    const User = await getUserByEmail(report.user);
    const UserReported = await getUserByEmail(report.reportedBy);
    
    if (!User) {
        throwModelError("Usuario no existe", null, "USER_NOT_FOUND", 404);
    }

    if (!UserReported) {
        throwModelError("Usuario reportado no existe", null, "USER_NOT_FOUND", 404);
    }

    if (!report.reason){
        throwModelError("El motivo del reporte es requerido", null, "VALIDATION_ERROR", 400);
    }

    const createdReport = await createReport(report);

    if(!createdReport){
        throwModelError("Error al crear el reporte", null, "CREATE_FAILED", 500);
    }
    return createdReport;
}

export const listReports = async () => {
    const listedReports = await getReports();
    if(!listedReports){
        throwModelError("Error al obtener la lista de reportes", null, "LIST_FAILED", 500);
    }
    return listedReports;
}

export const removeReport = async (id: string) => {
    if (!id) {
        throw new Error("Id del ticket requerido");
    }

    const deletedReport = await deleteReport(id);
    if(!deletedReport){
        throwModelError("Error al eliminar el reporte", null, "DELETE_FAILED", 500);
    }
    return deletedReport;
}