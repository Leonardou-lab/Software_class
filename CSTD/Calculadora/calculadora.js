$(document).ready(function () {

    // ── Helper para leer los inputs ──────────────────────────────────────────
    function getValues() {
        return {
            first:  parseFloat($("#fnumber").val()) || 0,
            second: parseFloat($("#snumber").val()) || 0
        };
    }

    function operate(op) {
        const { first, second } = getValues();
        const ops = {
            suma:           first + second,
            resta:          first - second,
            multiplicacion: first * second,
            division:       second !== 0 ? first / second : "Error: div/0"
        };
        $("#result").html(ops[op]);
    }

    $("#suma").click(()           => operate("suma"));
    $("#resta").click(()          => operate("resta"));
    $("#multiplicacion").click(() => operate("multiplicacion"));
    $("#division").click(()       => operate("division"));


    // ── 1. Serie de Fibonacci — 20 iteraciones ───────────────────────────────
    function fibonacci(n) {
        const serie = [0, 1];
        for (let i = 2; i < n; i++) {
            serie.push(serie[i - 1] + serie[i - 2]);
        }
        return serie.slice(0, n);
    }

    $("#fibonacci").click(function () {
        const resultado = fibonacci(20);
        console.log("Fibonacci:", resultado);
        $("#result").html(resultado.join(", "));
    });


    // ── 2. Número áureo (φ) — 10 iteraciones ────────────────────────────────
    // φ ≈ F(n+1) / F(n)  →  converge a 1.6180339...
    function numeroAureo(iteraciones) {
        const serie = fibonacci(iteraciones + 2);   // necesita un término extra
        const razones = [];
        for (let i = 1; i <= iteraciones; i++) {
            razones.push((serie[i + 1] / serie[i]).toFixed(10));
        }
        return razones;
    }

    $("#aureo").click(function () {
        const resultado = numeroAureo(10);
        console.log("Número áureo:", resultado);
        $("#result").html(resultado.join("<br>"));
    });


    // ── 3. Triángulo de asteriscos — 4 capas ─────────────────────────────────
    function triangulo(capas) {
        let figura = "";
        for (let i = 1; i <= capas; i++) {
            figura += "* ".repeat(i).trim() + "\n";
        }
        return figura;
    }

    $("#triangulo").click(function () {
        const resultado = triangulo(4);
        console.log("Triángulo:\n" + resultado);
        // <pre> para respetar saltos de línea en el HTML
        $("#result").html("<pre>" + resultado + "</pre>");
    });

});