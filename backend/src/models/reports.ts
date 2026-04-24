//src/models/reports.ts
import { BD } from "../config/supabase";
import { Report } from "../interface/reports";
import { throwModelError } from "../utils/error.handle";

const TABLE_REPORTS = "reports";

export const createReport = async (report: Report) => {
    const { data, error } = await BD
    .from(TABLE_REPORTS)
    .insert([report])
    .select("id, user, reason, reportedBy")
    .maybeSingle();

    if(error) throwModelError("Error al crear el reporte", error, "DB_CREATE_REPORT_FAIL");
    return data;
}

export const getReports = async () => {
    const { data, error } = await BD
    .from(TABLE_REPORTS)
    .select("id, user, reason, reportedBy");

    if(error) throwModelError("Error al obtener los reportes", error, "DB_GET_REPORTS_FAIL");
    return data;
}

export const getReportById = async (id: string) => {
    const { data, error } = await BD
    .from(TABLE_REPORTS)
    .select("id, user, reason, reportedBy")
    .eq("id", id)
    .maybeSingle();

    if(error) throwModelError("Error al obtener el reporte por Id", error, "DB_GET_REPORT_ID_FAIL");
    return data;
}

export const deleteReport = async (id: string) => {
    const { data, error } = await BD
    .from(TABLE_REPORTS)
    .delete()
    .eq("id", id)
    .select("id, user, reason, reportedBy");

    if(error) throwModelError("Error al eliminar el reporte", error, "DB_DELETE_REPORT_FAIL");
    return data;
}