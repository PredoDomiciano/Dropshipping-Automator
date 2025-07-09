package com.DropBots.Dropshipping.Auto.automation;

import com.DropBots.Dropshipping.Auto.entity.Order;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

@Service
public class SupplierAutomationService {

    public void purchaseFromSupplier(Order order) {
        System.out.println("======================================================");
        System.out.println("🤖 INICIANDO AUTOMAÇÃO REAL PARA O PEDIDO: " + order.getId());
        System.out.println("======================================================");

        // A linha abaixo usa o Selenium Manager para configurar e criar uma instância do Chrome
        WebDriver driver = new ChromeDriver();

        try {
            // 1. Navegar para a URL do produto
            // ATENÇÃO: Precisaremos adicionar a URL do fornecedor ao nosso modelo de Pedido/Produto
            // Por enquanto, vamos usar uma URL de exemplo.
            System.out.println("Navegando para o site do fornecedor...");
            driver.get("https://www.google.com/search?q=" + order.getProductName()); // Exemplo: busca o produto no Google

            // Maximiza a janela do navegador
            driver.manage().window().maximize();

            // Pausa de 10 segundos para você ver o navegador abrir.
            System.out.println("Aguardando 10 segundos para visualização...");
            Thread.sleep(10000);

            // TODO: Próximos passos da automação
            // 2. Encontrar o botão "Comprar" e clicar nele.
            // 3. Preencher o formulário de endereço de entrega com os dados do pedido.
            // 4. Inserir dados de pagamento e finalizar.

            System.out.println("✅ Automação finalizada.");

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Ocorreu um erro durante a pausa da automação: " + e.getMessage());
        } finally {
            // 5. Fechar o navegador (MUITO IMPORTANTE!)
            // O bloco finally garante que o navegador será fechado mesmo se ocorrer um erro.
            System.out.println("Fechando o navegador...");
            driver.quit();
            System.out.println("======================================================");
        }
    }
}