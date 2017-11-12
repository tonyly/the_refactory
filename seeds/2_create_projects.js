exports.seed = function(knex, Promise) {
  return knex("projects").del()
    .then(function() {
      return Promise.all([
        knex("projects").insert({
          id: 1,
          user_id: 1,
          name: "Target",
          description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
          status: "New",
          avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/2000px-Target_logo.svg.png",
        }),
        knex("projects").insert({
          id: 2,
          user_id: 3,
          name: "American Express",
          description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
          status: "In Progress",
          avatar: "https://web.aexp-static.com/sg/content/text/apple-pay/apple-pay-halo/images/icon-amex-big.png",
        }),
        knex("projects").insert({
          id: 3,
          user_id: 2,
          name: "Boy Scouts of America",
          description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
          status: "New",
          avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Boy_Scouts_of_America_corporate_trademark.svg/890px-Boy_Scouts_of_America_corporate_trademark.svg.png",
        }),
        knex("projects").insert({
          id: 4,
          user_id: 2,
          name: "Chase",
          description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          status: "Closed",
          avatar: "https://s-media-cache-ak0.pinimg.com/originals/0d/82/f9/0d82f9cff5bb23a5fdba81dbf76ac8f9.png",
        })
      ]);
    });
};
