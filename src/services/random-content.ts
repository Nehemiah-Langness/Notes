const loremIpsum =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sequi, repellendus, vitae obcaecati neque fugit nobis aliquam blanditiis voluptatem recusandae deleniti quis voluptates reiciendis? Dolorum dolor harum, voluptatum alias id perferendis sed at a fugiat atque. Vitae laboriosam nam non sed sequi officiis quam omnis nesciunt veniam doloribus commodi accusamus ratione excepturi nisi voluptatum, ullam laborum nobis temporibus eum, quas fugit perferendis? Doloribus repellendus molestias fugiat vitae accusamus esse veritatis, totam, aliquid voluptatibus consequatur dolor eligendi reprehenderit, molestiae minima cumque? Numquam iure odio nostrum unde minus, omnis, eligendi ipsum repellendus reprehenderit vel reiciendis perspiciatis tempora recusandae necessitatibus, quasi eos? Accusantium tempore ab quae perferendis quod perspiciatis officiis, adipisci ipsum necessitatibus! Molestiae esse fugiat corrupti, aliquam error placeat ipsa explicabo nihil dicta fuga odio! Tenetur, consequuntur! Nesciunt quasi, commodi reiciendis quae magnam ut animi, voluptate dolorem inventore molestiae earum, cumque aut enim unde sapiente quos voluptatibus id! Quasi sunt sed magni qui et, natus eaque alias soluta quas sapiente. Inventore aperiam mollitia placeat ea ducimus suscipit ratione aliquam corporis officia esse. Fugit repellendus porro delectus inventore dolore modi earum, animi culpa consequuntur in esse et reprehenderit odit a, natus veritatis debitis corporis voluptates aut harum quaerat. Officiis saepe fugiat voluptates alias.'.split(
		'. '
	);

function randomTitle() {
	const line = loremIpsum[Math.round(Math.random() * (loremIpsum.length - 1))];
	return line.split(' ').slice(0, 3).join(' ');
}

function randomText() {
	const line = loremIpsum[Math.round(Math.random() * (loremIpsum.length - 1))];
	return line;
}

export function randomContent() {
    return {
        title: randomTitle(),
        text: randomText()
    }
}