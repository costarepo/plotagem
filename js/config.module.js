export function delPreload() {
    document.querySelector('.preload').parentElement.remove();
    const layout = document.querySelector('.mdl-layout__container');
    layout.style.display = 'block';
    layout.style.height = '100%';
}

export function city(escolhidos) {
    const select = document.querySelector('#city');
    const ul = document.querySelector('.mdl-list');
    const li = document.createElement('li');
    li.className = 'mdl-list__item';
    const cor = document.createElement('div');
    cor.style.backgroundColor = randomColor(null, true);
    cor.style.width = '27px';
    cor.className = 'cores';
    cor.style.marginRight = '5%';
    cor.style.borderRadius = '360px';
    cor.style.height = '27px';
    const span = document.createElement('span');
    span.className = 'mdl-list__item-primary-content';
    span.textContent = select.value;
    const buttonRemove = document.createElement('button');
    buttonRemove.className = 'remove';
    buttonRemove.textContent = 'Remover';

    buttonRemove.addEventListener('focus', function() {
        setTimeout(function() {
            const item = buttonRemove.parentElement;
            for (let i = 0; i < escolhidos.length; i++) {
                if (escolhidos[i] === item.children[1].textContent) {
                    escolhidos.splice(i, 1);
                    break;
                }
            }
            del(item);
            item.remove();
        }, 500);
    });
    li.appendChild(cor);
    li.appendChild(span);
    li.appendChild(buttonRemove);
    ul.appendChild(li);
}
export function createColumn(escolhidos, dates) {
    let cidade = escolhidos[escolhidos.length - 1];
    const taxas = findTaxas(cidade, dates);
    const color = randomColor(cidade, false);
    for (const i of taxas) {
        const columnPlot = document.querySelector('#y' + i[0]);
        const column = document.createElement('div');
        if (cidade.includes(' ')) {
            cidade = cidade.replace(/ /g, '_');
        }
        column.className = cidade;
        column.style.backgroundColor = color;
        column.style.height = ((i[1]*100) / 45) + '%';
        column.style.width = '20px';
        column.style.display = 'flex';
        column.style.alignSelf = 'flex-end';
        if (column !== null && columnPlot !== null) {
            columnPlot.appendChild(column);
        }
    }
}

function findTaxas(cidade, dates) {
    const taxas = [];
    let year = null;
    for (let i=0; i<dates.length; i++) {
        if (dates[i].ibge === 'ibge') {
            year = dates[i].taxa.substring(30, 34);
        }
        if (dates[i].municipio === cidade) {
            taxas.push([parseInt(year), parseFloat(dates[i].taxa)]);
        }
    }

    taxas.sort(function(a, b) {
        return a[0] - b[0];
    });

    return taxas;
}

function randomColor(cidade, mode) {
    if (mode) {
        const red = parseInt(Math.random(1) * 255);
        const green = parseInt(Math.random(1) * 255);
        const blue = parseInt(Math.random(1) * 255);
        return `rgb(${red},${green},${blue})`;
    } else {
        const li = document.querySelectorAll('.cores');
        for (const i of li) {
            const text = i.parentElement.children[1].textContent;
            if (text === cidade) {
                return i.parentElement.firstChild.style.backgroundColor;
            }
        }
    }
}

function del(item) {
    let name = item.children[1].textContent;
    name.includes(' ') ? name = name.replace(/ /g, '_') : null;
    const columns = document.querySelectorAll('.' + name);
    for (let i=0; i<columns.length; i++) {
        columns[i].remove();
    }
}
