function openDemo (browser, hash) {
    var url = 'http://localhost:8080/docs/index.html';
    if (hash)
        url += '#'+hash;
    browser.url(url);
    browser.expect.element('#main_content').to.be.present;
}

function closeDemo (browser) {
    browser.end();
}

module.exports = {

    'Open and Close lightbox page' : function (browser) {
        openDemo(browser);
        browser.click('.demo_activity li [src="images/thumb1.jpg"]')
            .waitForElementPresent('#imagelightbox', 1000)
            .execute(function() {
                document.querySelector('#container').click();
                browser.waitForElementNotPresent('#imagelightbox', 1000);
                closeDemo(browser);
            });
    },

    'Caption' : function (browser) {
        openDemo(browser);
        browser.click('.demo_caption li [src="images/thumb1.jpg"]')
            .waitForElementVisible('#imagelightbox', 1000)
            .assert.elementPresent('#imagelightbox')
            .waitForElementVisible('.imagelightbox-caption', 1000)
            .assert.containsText('.imagelightbox-caption', 'Sunset in Tanzania');
        closeDemo(browser);
    },

    'Deep links' : function (browser) {
        openDemo(browser, 'showImage_2');
        browser
            .waitForElementVisible('#imagelightbox', 2000)
            .assert.elementPresent('#imagelightbox')
            .waitForElementVisible('img[src$="images/demo2.jpg"]', 1000)
            .assert.elementPresent('img[src$="images/demo2.jpg"]');
        closeDemo(browser);
    },

    'Dynamic add' : function (browser) {
        openDemo(browser);
        browser.click('.add_image')
            .click('.demo_dynamic li [src="images/thumb4.jpg"]')
            .waitForElementVisible('#imagelightbox', 1000)
            .assert.elementPresent('#imagelightbox')
            .waitForElementVisible('img[src$="images/demo4.jpg"]', 1000)
            .assert.elementPresent('img[src$="images/demo4.jpg"]')
            .click('.imagelightbox-arrow-right')
            .waitForElementVisible('img[src$="images/demo1.jpg"]', 1000)
            .assert.elementPresent('img[src$="images/demo1.jpg"]');
        closeDemo(browser);
    },

    'Manual trigger' : function (browser) {
        openDemo(browser);
        browser.click('.trigger_lightbox')
            .waitForElementVisible('#imagelightbox', 1000)
            .assert.elementPresent('#imagelightbox')
            .click('.imagelightbox-arrow-right')
            .waitForElementVisible('img[src$="images/demo2.jpg"]', 1000)
            .assert.elementPresent('img[src$="images/demo2.jpg"]');
        closeDemo(browser);
    },

    'Navigation' : function (browser) {
        openDemo(browser);
        browser
            .click('.demo_navigation li [src="images/thumb1.jpg"]')
            .waitForElementVisible('#imagelightbox', 1000)
            .assert.elementPresent('#imagelightbox')
            .assert.elementPresent('.imagelightbox-nav')
            .assert.elementPresent('.imagelightbox-navitem')
            .click('.imagelightbox-navitem:nth-child(2)')
            .waitForElementVisible('img[src$="images/demo2.jpg"]', 1000)
            .assert.elementPresent('img[src$="images/demo2.jpg"]');
        closeDemo(browser);
    }
};
