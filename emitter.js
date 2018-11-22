'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = true;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    const events = {};

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            // console.info(event, context, handler);
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push({ context, handler });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            // console.info(event, context);
            Object
                .keys(events)
                .forEach(key => {
                    if (key === event || key.startsWith(event + '.')) {
                        events[key] = events[key].filter(e => e.context !== context);
                    }
                }
                );

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            console.info(event);
            Object
                .keys(events)
                .filter(e => e === event || event.startsWith(`${e}.`))
                .sort((a, b) => a.localeCompare(b))
                .reverse()
                .forEach(eventName => events[eventName]
                    .forEach(e => e.handler.call(e.context)));

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            // console.info(event, context, handler, times);
            this.on(event, context, () => {
                if (times > 0) {
                    handler.call(context);
                }
                times--;
            });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
            let count = 0;
            this.on(event, context, () => {
                if (count % frequency === 0) {
                    handler.call(context);
                }
                count++;
            });

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
