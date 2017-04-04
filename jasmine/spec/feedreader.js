/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URLs are defined', function() {
            expect(allFeeds).toBeDefined();
            var urlIsDefined = true;
            // loop through the feed
            for (var i = 0; i < allFeeds.length; i++) {
                /* if current feed url lenght is less than 8 after trimming spaces
                 * it means that the string does not even contain http://
                 */
                if (allFeeds[i].url.trim().length < 8) {
                    urlIsDefined = false;
                }
            }
            expect(urlIsDefined).toBe(true);
        });

        it('Names are defined', function() {
            expect(allFeeds).toBeDefined();
            var nameIsDefined = true;
            // loop through the feed
            for (var i = 0; i < allFeeds.length; i++) {
                /* if current feed name lenght is less than 1 after trimming spaces
                 * it means the name is empty or that it contains only empty spaces
                 */
                if (allFeeds[i].name.trim().length < 1) {
                    nameIsDefined = false;
                }
            }
            expect(nameIsDefined).toBe(true);
        });
    });

    describe('The menu', function() {

        it('The menu is hidden by default', function() {
            expect($('body')).toBeDefined();
            expect($('body')).toHaveClass('menu-hidden');
        });

        it('The menu changes visibility when the menu icon is clicked', function() {
            expect($('body')).toBeDefined();
            expect($('.menu-icon-link')).toBeDefined();
            $('.menu-icon-link').trigger("click");
            expect($('body')).not.toHaveClass('menu-hidden');
            $('.menu-icon-link').trigger("click");
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            expect(allFeeds).toBeDefined();
            loadFeed(0, done);
        });

        it('There is at least a single .entry element', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var feedOne;
        var feedTwo;

        beforeEach(function(done) {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
            loadFeed(0, function() {
                feedOne = $('.feed').html();
                done();
            });

        });

        it('A new feed is loaded when loadFeed is called a second time', function(done) {
            loadFeed(1, function() {
                feedTwo = $('.feed').html();
                expect(feedOne).not.toEqual(feedTwo);
                done();
            });
        });
    });
}());
