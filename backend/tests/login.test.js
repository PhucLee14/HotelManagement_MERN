const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

(async function example() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Mở trang web của bạn
        await driver.get("http://localhost:3000/admin/login");

        // Tìm trường nhập tên bằng `id` và điền thông tin
        let nameField = await driver.findElement(By.id("username"));
        await nameField.sendKeys("TK001");

        // Tìm trường nhập email bằng `id` và điền thông tin
        let emailField = await driver.findElement(By.id("password"));
        await emailField.sendKeys("tk000");

        // Tìm nút gửi bằng `id` và nhấn vào nút
        let submitButton = await driver.findElement(By.id("submit"));
        await submitButton.click();

        // Chờ 3 giây trước khi tắt
        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log("Form submitted successfully!");
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await driver.quit(); // Đóng trình duyệt khi hoàn thành
    }
})();
