<?php
    session_start();
    
    $host = "addcosta-info-2.cvmcahk1ynui.us-east-2.rds.amazonaws.com";
    $db = "20212lp2";
    $user = "201818360014";
    $password = "123";
    
    try {
    	$dsn = "pgsql:host=$host;port=5432;dbname=$db;";
    
    	$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
        $usuarios = $pdo->query("select email,senha from 201818360014.Mercado");

        $email = $_POST["email"];
        $senha = $_POST["senha"];
        
        if (isset($_GET["destruir"]))
            session_destroy();
        
        //Deslogar    
        if (isset($_GET["deslogar"]))
            foreach ($_SESSION["usuarios"] as $chave => $valor)
                if ($valor==$_GET["deslogar"])
                    unset($_SESSION["usuarios"][$chave]);
                    
        //Login
        foreach ($usuarios as $valor)
            if ($email==$valor["email"] and $senha==$valor["senha"])
                $_SESSION["usuarios"][] = $valor["email"];
        
        //Exibir logados
        foreach ($_SESSION["usuarios"] as $valor)
            echo $valor."<a href='submit.php?deslogar=".$valor."'>Deslogar</a><br />";
        
    } catch (PDOException $e) {
    	die($e->getMessage());
    }

?>