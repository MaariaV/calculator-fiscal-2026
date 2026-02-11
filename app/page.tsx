"use client";

import React, { useState } from "react";

// Tooltip simplu inline
const Tooltip = ({ text }: { text: string }) => (
  <span className="ml-1 text-gray-500 text-sm">({text})</span>
);

// Plafon TVA și coduri pentru normă
const PLAFON_TVA = 395000;
const CAEN_NORME = ["6201", "6202", "7022", "7490"];

// Lista orientativă CAEN cu descriere
const CAEN_OPTIONS = [
  { cod: "6201", descriere: "Activități de realizare a software-ului la comandă" },
  { cod: "6202", descriere: "Activități de consultanță în tehnologia informației" },
  { cod: "7022", descriere: "Activități de consultanță pentru afaceri și management" },
  { cod: "7490", descriere: "Alte activități profesionale, științifice și tehnice" },
  { cod: "4711", descriere: "Comerț cu amănuntul al produselor alimentare în magazine specializate" },
  { cod: "4321", descriere: "Instalarea utilajelor electrice" },
];

// Norme de venit orientative pentru coduri CAEN eligibile
const NORMA_VENIT_OPTIONS: Record<string, number[]> = {
  "6201": [30000, 50000, 70000],
  "6202": [25000, 40000, 60000],
  "7022": [20000, 35000, 50000],
  "7490": [15000, 30000, 45000],
};

type Rezultate = {
  pfaReal: number;
  pfaNorma: number | null;
  srlMicro: number;
  srlProfit: number;
  tva: string;
};

export default function Page() {
  const [venit, setVenit] = useState(0);
  const [cheltuieli, setCheltuieli] = useState(0);
  const [codCaen, setCodCaen] = useState("");
  const [normaVenit, setNormaVenit] = useState<number | "">("");
  const [srlCheltuieli, setSrlCheltuieli] = useState(0);
  const [srlSalariuBrut, setSrlSalariuBrut] = useState(0);
  const [rezultate, setRezultate] = useState<Rezultate | null>(null);

  function calculeaza() {
    const impozitPFA = 0.10;
    const CASpfa = 0.25;
    const CASSpfa = 0.10;

    const areTVA = venit > PLAFON_TVA;
    const tvaText = areTVA
      ? `Trebuie TVA, deoarece venitul depășește ${PLAFON_TVA.toLocaleString("ro-RO")} lei`
      : `Fără TVA (venitul este sub ${PLAFON_TVA.toLocaleString("ro-RO")} lei)`;

    // PFA sistem real
    const netPFAreal = Math.max(venit - cheltuieli, 0);
    const taxePFAreal = netPFAreal * (impozitPFA + CASpfa + CASSpfa);
    const rezultatPFAreal = netPFAreal - taxePFAreal;

    // PFA normă
    let rezultatPFAnorma: number | null = null;
    if (CAEN_NORME.includes(codCaen) && typeof normaVenit === "number") {
      const bazaNorma = normaVenit;
      const taxeNorma = bazaNorma * (impozitPFA + CASpfa + CASSpfa);
      rezultatPFAnorma = Math.max(bazaNorma - taxeNorma, 0);
    }

    // SRL Micro
    const impozitMicro = 0.01;
    const profitBrutMicro = Math.max(venit - srlCheltuieli - srlSalariuBrut, 0);
    const taxeSRLmicro = venit * impozitMicro;
    const rezultatSRLmicro = Math.max(profitBrutMicro - taxeSRLmicro, 0); // corecție: nu mai poate fi negativ

    // SRL Profit
    const impozitProfit = 0.16;
    const profitBrutProfit = Math.max(venit - srlCheltuieli - srlSalariuBrut, 0);
    const taxeSRLprofit = profitBrutProfit * impozitProfit;
    const rezultatSRLprofit = profitBrutProfit - taxeSRLprofit;

    setRezultate({
      pfaReal: Math.round(rezultatPFAreal),
      pfaNorma: rezultatPFAnorma !== null ? Math.round(rezultatPFAnorma) : null,
      srlMicro: Math.round(rezultatSRLmicro),
      srlProfit: Math.round(rezultatSRLprofit),
      tva: tvaText,
    });
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center">📊 Calculator Fiscal România 2026</h1>

      {/* Formularele de input */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">📥 Date introduse</h2>
        <div className="grid gap-4">
          <div>
            <label className="font-semibold flex items-center">
              Venit anual (RON) <Tooltip text="Total venit încasat în anul fiscal" />
            </label>
            <input
              type="number"
              value={venit}
              onChange={(e) => setVenit(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center">
              Cheltuieli PFA (RON) <Tooltip text="Cheltuieli deductibile conform Cod fiscal" />
            </label>
            <input
              type="number"
              value={cheltuieli}
              onChange={(e) => setCheltuieli(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Cod CAEN manual */}
          <div>
            <label className="font-semibold flex items-center">
              Cod CAEN <Tooltip text="Introdu codul CAEN pentru activitatea ta" />
            </label>
            <input
              type="text"
              value={codCaen}
              onChange={(e) => {
                setCodCaen(e.target.value.replace(/\s/g, ""));
                setNormaVenit("");
              }}
              placeholder="Ex: 6201"
              className="border p-2 rounded w-full"
            />
          </div>

          {CAEN_NORME.includes(codCaen) && (
            <div>
              <label className="font-semibold flex items-center">
                Normă de venit (RON) <Tooltip text="Selectează norma oficială pentru codul CAEN" />
              </label>
              <select
                value={normaVenit}
                onChange={(e) => setNormaVenit(Number(e.target.value))}
                className="border p-2 rounded w-full"
              >
                <option value="">-- Alege normă de venit --</option>
                {NORMA_VENIT_OPTIONS[codCaen].map((valoare) => (
                  <option key={valoare} value={valoare}>
                    {valoare.toLocaleString("ro-RO")} RON
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="font-semibold flex items-center">
              Cheltuieli SRL (RON) <Tooltip text="Cheltuieli deductibile SRL" />
            </label>
            <input
              type="number"
              value={srlCheltuieli}
              onChange={(e) => setSrlCheltuieli(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center">
              Salariu brut SRL (RON) <Tooltip text="Total salarii brute angajați" />
            </label>
            <input
              type="number"
              value={srlSalariuBrut}
              onChange={(e) => setSrlSalariuBrut(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={calculeaza}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded font-semibold"
          >
            Calculează
          </button>
        </div>
      </section>

      {/* Tabel rezultate */}
      {rezultate && (
        <section className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">📈 Rezultate detaliate</h2>
          <p className="italic text-center text-gray-700 mb-4">{rezultate.tva}</p>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Tip</th>
                <th className="border px-4 py-2">Net estimat (RON)</th>
                <th className="border px-4 py-2">Cheltuieli SRL (RON)</th>
                <th className="border px-4 py-2">Salariu brut SRL (RON)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border px-4 py-2">PFA (sistem real)</td>
                <td className="border px-4 py-2">{rezultate.pfaReal.toLocaleString("ro-RO")}</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">-</td>
              </tr>

              {rezultate.pfaNorma !== null && (
                <tr className="bg-white">
                  <td className="border px-4 py-2">PFA (normă)</td>
                  <td className="border px-4 py-2">{rezultate.pfaNorma.toLocaleString("ro-RO")}</td>
                  <td className="border px-4 py-2">-</td>
                  <td className="border px-4 py-2">-</td>
                </tr>
              )}

              <tr className="bg-white">
                <td className="border px-4 py-2">SRL (micro)</td>
                <td className="border px-4 py-2">{rezultate.srlMicro.toLocaleString("ro-RO")}</td>
                <td className="border px-4 py-2">{srlCheltuieli.toLocaleString("ro-RO")}</td>
                <td className="border px-4 py-2">{srlSalariuBrut.toLocaleString("ro-RO")}</td>
              </tr>

              <tr className="bg-white">
                <td className="border px-4 py-2">SRL (profit)</td>
                <td className="border px-4 py-2">{rezultate.srlProfit.toLocaleString("ro-RO")}</td>
                <td className="border px-4 py-2">{srlCheltuieli.toLocaleString("ro-RO")}</td>
                <td className="border px-4 py-2">{srlSalariuBrut.toLocaleString("ro-RO")}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* Concluzie */}
      {rezultate && (
        <section className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-2">✅ Concluzie</h2>
          <p className="text-center text-gray-700">
            {(() => {
              const vals = [
                { tip: "PFA real", valoare: rezultate.pfaReal },
                ...(rezultate.pfaNorma !== null ? [{ tip: "PFA normă", valoare: rezultate.pfaNorma }] : []),
                { tip: "SRL micro", valoare: rezultate.srlMicro },
                { tip: "SRL profit", valoare: rezultate.srlProfit },
              ];
              const max = vals.reduce((prev, curr) => (curr.valoare > prev.valoare ? curr : prev), vals[0]);
              return `Cea mai avantajoasă formă fiscală estimativă este ${max.tip} cu ${max.valoare.toLocaleString("ro-RO")} RON net.`;
            })()}
          </p>
        </section>
      )}

      {/* Dicționar termeni */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">🧠 Dicționar termeni</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          <li><strong>Venit brut:</strong> Totalul încasărilor.</li>
          <li><strong>Cheltuieli deductibile:</strong> Cheltuieli recunoscute legal.</li>
          <li><strong>CASS:</strong> Contribuție asigurări sociale de sănătate.</li>
          <li><strong>CAS:</strong> Contribuție asigurări sociale (pensie).</li>
          <li><strong>TVA:</strong> Taxă pe valoare adăugată.</li>
        </ul>
      </section>
    </div>
  );
}
