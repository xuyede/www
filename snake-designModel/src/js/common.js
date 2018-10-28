let tool = {
    inherit : (function () {
        var temp = function () {}

        return function (origin, target) {
            temp.prototype = target.prototype
            origin.prototype = new temp
            origin.prototype.constructor = origin
            origin.prototype.uber = target
        }
    }()),

    extend (origin) {
        let instance = function () {
            origin && origin.apply(this, arguments)
        }

        origin && this.inherit(instance, origin)
        return instance
    },

    single (origin) {
        let singleInstance = (function () {
            let instance = null

            return function () {
                if (instance != null) {
                    return instance
                }

                origin && origin.apply(this, arguments)
                instance = this
            }
        }())

        origin && this.inherit(singleInstance, origin)
        return singleInstance
    },

    throttle (handle, wait) {
        let lastTime = 0
            // self = this

        return function () {
            var nowTime = new Date().getTime()
            if (nowTime - lastTime > wait) {
                handle.apply(this, arguments)
                lastTime = nowTime
            }
        }
    }
}