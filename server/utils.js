function operator(models) {
    let subjectName, subjectOption;

    function subject(str, option) {
        subjectName = str;
        subjectOption = option;
        return verb
    }

    let verb = {
        get() {
        },
        set(objectName, option) {
            return new Promise(function (resolve, reject) {
                let s = models[subjectName];
                let o = models[objectName];
                o.find(option, function (err, objects) {
                    if (err || objects[0]) {
                        reject();
                        return;
                    }
                    s.find(subjectOption, function (err, subjects) {
                        if (err || subjects[0]) {
                            reject();
                            return;
                        }
                        objectName = objectName.substring(0, 1).toUpperCase() + objectName.substring(1);
                        objectName = 'set' + objectName;
                        subjects[0][objectName](objects[0], function (err) {
                            if (err) reject();

                            resolve()
                        })
                    })
                })

            })

        }
    }

    return subject
}

module.exports={operator}
