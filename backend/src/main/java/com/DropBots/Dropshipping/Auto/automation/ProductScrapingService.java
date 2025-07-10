package com.DropBots.Dropshipping.Auto.automation;

import com.DropBots.Dropshipping.Auto.entity.Product;
import com.DropBots.Dropshipping.Auto.service.ProductService;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

@Service
public class ProductScrapingService {

    @Autowired
    private ProductService productService;

    @Scheduled(fixedRate = 7200000, initialDelay = 30000)
    public void scrapeSupplierForDeals() {
        System.out.println("======================================================");
        System.out.println("🤖 INICIANDO BUSCA AGENDADA NO SITE DE TESTES...");
        System.out.println("======================================================");

        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops");
            driver.manage().window().maximize();

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            By cardSelector = By.cssSelector("div.card");
            wait.until(ExpectedConditions.presenceOfElementLocated(cardSelector));

            List<WebElement> productCards = driver.findElements(cardSelector);
            System.out.println("Encontrados " + productCards.size() + " produtos no site de testes.");

            for (WebElement card : productCards) {
                try {
                    String productName = card.findElement(By.cssSelector("a.title")).getText();
                    String productUrl = card.findElement(By.cssSelector("a.title")).getAttribute("href");
                    String priceStr = card.findElement(By.cssSelector("h4.price")).getText()
                            .replace("$", "").trim();

                    BigDecimal productPrice = new BigDecimal(priceStr);

                    Product newProduct = new Product();
                    newProduct.setName(productName);
                    newProduct.setPrice(productPrice);
                    newProduct.setSupplierPrice(productPrice);
                    newProduct.setSupplierUrl(productUrl);
                    newProduct.setDescription(card.findElement(By.cssSelector("p.description")).getText());
                    newProduct.setCategory("Laptops (Teste)");
                    newProduct.setImage(card.findElement(By.cssSelector("img.card-img-top")).getAttribute("src"));
                    newProduct.setStock(50);
                    newProduct.setRating(0);

                    productService.createProduct(newProduct);
                    System.out.println("Produto salvo: " + productName);

                } catch (Exception e) {
                    System.err.println("Falha ao processar um card de produto: " + e.getMessage());
                }
            }

        } catch (Exception e) {
            System.err.println("Ocorreu um erro geral durante a busca por promoções: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("======================================================");
            System.out.println("🤖 BUSCA AGENDADA FINALIZADA.");
            System.out.println("======================================================");
        }
    }
}