<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simulador de Créditos</title>

  <!-- CSS Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <!-- Gotham Font -->
  <link href="https://fonts.cdnfonts.com/css/gotham" rel="stylesheet">

  <!-- CSS personalizado -->
  <link href="styles.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="calculator-box">
          <div class="text-center mb-4">
            <img src="logo.png" alt="Logo" class="logo-img">
            <h3 class="welcome-text">Simulador de Créditos</h3>
          </div>
          <form action="" name="formulario" id="formulario" method="POST">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="forma_pago" class="form-label">Forma de pago(*)</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                  <select name="forma_pago" id="forma_pago" class="form-select" required>
                    <option value="">Seleccione...</option>
                    <option value="diario">Diario</option>
                    <option value="semanal">Semanal</option>
                    <option value="quincenal">Quincenal</option>
                    <option value="mensual">Mensual</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="inicio_pago" class="form-label">Inicio pago(*)</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
                  <input class="form-control" type="date" name="inicio_pago" id="inicio_pago" required>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="monto" class="form-label">Monto(*)</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                  <input class="form-control" type="number" name="monto" id="monto" required>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="inicial" class="form-label">Inicial(*)</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-money-bill"></i></span>
                  <input class="form-control" type="number" name="inicial" id="inicial" required>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="plazo" class="form-label">Plazo(*)</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-clock"></i></span>
                  <input class="form-control" type="number" name="plazo" id="plazo" required>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="interes" class="form-label">Interés(*)</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-percentage"></i></span>
                  <input class="form-control" type="number" name="interes" id="interes" required>
                </div>
              </div>
              <div class="col-12 text-center mb-4">
                <button class="btn btn-primary btn-lg px-5" type="button" id="btnGenerar">
                  Generar Cronograma
                </button>
              </div>
            </div>
          </form>

          <div class="table-responsive mt-4">
            <table id="tblcronograma" class="table table-hover">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Vencimiento</th>
                  <th>Interés</th>
                  <th>Cuota</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Archivo JavaScript -->
  <script src="simulador.js"></script>
</body>
</html>
