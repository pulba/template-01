import { z } from "zod";

export const TermItemSchema = z.object({
  label: z.string(),
  plural: z.string(),
  short: z.string(),
  long: z.string(),
  formal: z.string(),
});

export const TerminologyDictionarySchema = z.object({
  admissions: TermItemSchema.default({
    label: "Pendaftaran",
    plural: "Pendaftaran",
    short: "PPDB",
    long: "Penerimaan Peserta Didik Baru",
    formal: "Pendaftaran Siswa Baru",
  }),
  student: TermItemSchema.default({
    label: "Siswa",
    plural: "Siswa-siswi",
    short: "Murid",
    long: "Peserta Didik",
    formal: "Peserta Didik",
  }),
  teacher: TermItemSchema.default({
    label: "Guru",
    plural: "Dewan Guru",
    short: "Guru",
    long: "Tenaga Pendidik",
    formal: "Tenaga Pendidik",
  }),
  extracurricular: TermItemSchema.default({
    label: "Ekstrakurikuler",
    plural: "Kegiatan Ekstrakurikuler",
    short: "Ekskul",
    long: "Kegiatan Ekstrakurikuler",
    formal: "Kegiatan Ekstrakurikuler",
  }),
  classroom: TermItemSchema.default({
    label: "Kelas",
    plural: "Ruang Kelas",
    short: "Kelas",
    long: "Rombongan Belajar",
    formal: "Rombongan Belajar",
  }),
  major: TermItemSchema.default({
    label: "Jurusan",
    plural: "Jurusan",
    short: "Jurusan",
    long: "Program Keahlian",
    formal: "Program Keahlian",
  }),
  alumni: TermItemSchema.default({
    label: "Alumni",
    plural: "Alumni",
    short: "Alumni",
    long: "Ikatan Alumni",
    formal: "Ikatan Alumni",
  }),
  staff: TermItemSchema.default({
    label: "Staf",
    plural: "Staf & Karyawan",
    short: "Staf",
    long: "Tenaga Kependidikan",
    formal: "Tenaga Kependidikan",
  }),
  principal: TermItemSchema.default({
    label: "Kepala Sekolah",
    plural: "Kepala Sekolah",
    short: "Kepsek",
    long: "Kepala Sekolah",
    formal: "Kepala Sekolah",
  }),
});

export const TerminologySchema = z.object({
  version: z.number().default(1),
  dictionary: TerminologyDictionarySchema.default(TerminologyDictionarySchema.parse({}) as any),
});

export type TerminologyData = z.infer<typeof TerminologySchema>;

// Get default terminology to be used as fallback
export const defaultTerminology: TerminologyData = {
  version: 1,
  dictionary: TerminologyDictionarySchema.parse({})
};

/**
 * Parses terminology string from DB, merges with default, and returns validated object.
 */
export function getSchoolTerminology(jsonString?: string | null): TerminologyData {
  if (!jsonString || jsonString === "null") return defaultTerminology;
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object") return defaultTerminology;
    // Zod's safeParse will validate and fill in missing fields with default values
    const result = TerminologySchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }
    console.warn("Terminology JSON validation failed, using defaults.", result.error);
    return defaultTerminology;
  } catch (e) {
    console.error("Failed to parse terminology JSON, using defaults.", e);
    return defaultTerminology;
  }
}

/**
 * Replace {short}, {long}, {label}, {plural}, {formal} in a template string based on a TermItem
 */
export function t(template: string, termItem: z.infer<typeof TermItemSchema>): string {
  if (!template || !termItem) return template;
  let result = template;
  result = result.replace(/{label}/g, termItem.label);
  result = result.replace(/{plural}/g, termItem.plural);
  result = result.replace(/{short}/g, termItem.short);
  result = result.replace(/{long}/g, termItem.long);
  result = result.replace(/{formal}/g, termItem.formal);
  return result;
}
