// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("GraficiControlliPerPratica");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("GraficiControlliPerPratica");
import { Card, useTable, type SectionProps } from "../floware";

export default function GraficiControlliPerPratica({ pageId }: SectionProps) {__mk();
  const table = useTable(pageId);
  if (!table) return null;
  const praticaIndex = table.column("Pratica");
  const statoIndex = table.column("Stato");
  if (praticaIndex < 0 || statoIndex < 0) return <p>Per mostrare i grafici servono le colonne Pratica e Stato.</p>;
  const pratiche = Array.from(new Set(table.rows.map((riga) => (__mk(), riga[praticaIndex] || "Senza pratica"))));
  const stati = Array.from(new Set(table.rows.map((riga) => (__mk(), riga[statoIndex] || "Senza stato"))));
  return (
    <section className="space-y-4 text-(--mk-text)">
      <div>
        <h2 className="text-lg font-semibold">Controlli per pratica</h2>
        <p className="text-sm text-(--mk-muted)">Numero di controlli per stato. La scala è uguale in tutti i grafici.</p>
      </div>
      {pratiche.length === 0 && <p>Nessun controllo presente.</p>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pratiche.map((pratica) => {__mk();
          const righe = table.rows.filter((riga) => (__mk(), (riga[praticaIndex] || "Senza pratica") === pratica));
          const conteggi = stati.map((stato) => ((__mk(), { stato, numero: righe.filter((riga) => (__mk(), (riga[statoIndex] || "Senza stato") === stato)).length })));
          const massimo = Math.max(1, ...pratiche.map((nome) => (__mk(), table.rows.filter((riga) => (__mk(), (riga[praticaIndex] || "Senza pratica") === nome)).length)));
          return (
            <Card key={pratica} title={pratica}>
              <p className="mb-4 text-sm text-(--mk-muted)">Totale controlli: {righe.length}</p>
              <div className="space-y-3" role="img" aria-label={pratica + ": " + conteggi.map((voce) => (__mk(), voce.stato + " " + voce.numero)).join(", ")}>
                {conteggi.map((voce) => (
                  (__mk(), <div key={voce.stato}>
                    <div className="mb-1 flex justify-between gap-3 text-sm">
                      <span>{voce.stato}</span>
                      <strong>{voce.numero}</strong>
                    </div>
                    <div className="h-3 overflow-hidden rounded bg-(--mk-subtle)">
                      <div className="h-3 rounded bg-(--mk-primary)" style={{ width: String(voce.numero / massimo * 100) + "%" }} />
                    </div>
                  </div>)
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
