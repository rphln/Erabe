import {
  html,
  Component,
  render,
} from "https://cdn.jsdelivr.net/npm/htm@3.1.0/preact/standalone.module.js";

import {
  times,
  range,
  sortBy,
  shuffle,
  sum,
  cloneDeep,
  flatMap,
  castArray,
  set,
} from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js";

function makeMatrix(size, fill) {
  return times(size, (y) => {
    return times(size, (x) => fill);
  });
}

/**
 * Returns an iterator over the combinations with no replacement of the specified elements.
 * @param elements The elements with which the pairs will be made.
 * @param n The number of elements per combination.
 */
function combinations(elements, n = 2) {
  if (n === 1) return elements.map(castArray);

  return elements.flatMap((first, index) => {
    return combinations(elements.slice(index + 1), n - 1).map((partial) => {
      return [first, ...partial];
    });
  });
}

const response = {
  result: "ok",
  statuses: {
    "e78a489b-6632-4d61-b00b-5206f5b8b22b": "reading",
    "93f8f571-5e98-4df1-bb4a-7c97fe10abef": "dropped",
    "0d5bf9e9-e99f-4eaf-8ac2-f9585f71dca4": "dropped",
    "0c9ec14d-c51f-49aa-b343-2e016c957f83": "completed",
    "a8592c33-5f7c-4fcb-b100-531153604486": "dropped",
    "de9e3b62-eac5-4c0a-917d-ffccad694381": "reading",
    "ae60aa84-3c58-40f1-935b-c7cdd1d5af6b": "dropped",
    "4052eaa7-966e-43c8-9b28-d7a79052ca1b": "reading",
    "3e98f2a9-f57d-4d08-89aa-b5b2189f7fb6": "completed",
    "8ba88f61-67fd-4a08-8d4b-faeb7130924e": "dropped",
    "d0a48877-176b-4f60-8f4d-2ae47fbb2e9c": "completed",
    "c12bded1-f4d1-43e9-8d02-83a62ce78db9": "dropped",
    "46889536-a4c3-400e-a892-804d0dc879dc": "plan_to_read",
    "edcfac00-58df-4c70-be79-308d26cd3b28": "dropped",
    "c3557b1c-7523-4de1-9670-cce10f5166d6": "reading",
    "2dab66cc-f819-4ac4-8566-717331348f4b": "plan_to_read",
    "2f310ec7-b797-4b2b-a059-1f542958f308": "dropped",
    "d0f135d0-da19-42dd-8ffe-4851d661bab6": "plan_to_read",
    "2e0fdb3b-632c-4f8f-a311-5b56952db647": "plan_to_read",
    "09c05d8c-9fb8-4aaf-a210-30c697f45f6e": "completed",
    "31449055-f45b-4d53-b5a5-a7f64387ffb2": "plan_to_read",
    "9ef97eba-e0bc-452c-9ed0-bfb645d9b536": "plan_to_read",
    "27578f15-e6c5-4378-b07f-8bbdeac90b39": "completed",
    "6db4c84e-1e3c-4d57-b441-a0a31fd6f4e8": "plan_to_read",
    "b82b27ba-3072-4f5b-9f47-44947af099ff": "dropped",
    "5de63ed1-61ae-4f1a-8822-1b7e40e96e42": "dropped",
    "23cd5e60-0e39-45b5-acac-61db087eb9bc": "plan_to_read",
    "605ad5b4-f04f-41df-8424-35c397db2a3b": "plan_to_read",
    "04e8402a-5e1d-4f58-aa2b-24fad8ffab50": "dropped",
    "41afca6c-a642-480f-99ff-8a2490e5dd41": "plan_to_read",
    "44dcdd98-2afb-4cbc-b0ee-65ac14fed95a": "plan_to_read",
    "5865a005-f97c-475d-830e-a5863362aa21": "dropped",
    "2431dfcf-bae2-4e51-a4f6-d5375d561e31": "reading",
    "9a9bbd35-a923-494e-855f-2ffe60992dc6": "reading",
    "58dd8b2b-10cc-4060-8036-5c73f123d3b0": "plan_to_read",
    "f344a1fd-0338-4e8a-b024-0f5545d72488": "plan_to_read",
    "5a630c5f-8557-40a2-8c06-a86fc83563f1": "reading",
    "30196491-8fc2-4961-8886-a58f898b1b3e": "dropped",
    "66f42f5f-bcb7-437b-9ae5-752c84bce709": "plan_to_read",
    "cd9a9438-67e5-48b4-84bc-d9f1e2ec2bde": "dropped",
    "7cd3ca23-2d70-4c03-99f0-b1ee848c4dc4": "dropped",
    "00a82fcc-997d-4139-9d2c-8935628199c5": "dropped",
    "b64f1fc5-714d-4f4d-8fd7-e79005a28160": "plan_to_read",
    "a7743106-23b9-405e-a5a1-99854e4948ec": "plan_to_read",
    "26dd4eae-1bf7-4834-986b-40914cbd5816": "dropped",
    "1aa09c5e-d6cd-4662-93f2-8c64331b6234": "dropped",
    "37f5cce0-8070-4ada-96e5-fa24b1bd4ff9": "plan_to_read",
    "ef96c21c-6838-43d1-9b6e-cb30546bba8c": "plan_to_read",
    "de3f1db5-8de4-4f19-b218-0c62f0a63ea7": "dropped",
    "283c8548-55d3-4fed-90cc-75e8c05e2fab": "plan_to_read",
    "ece511da-3461-421a-8275-7af48a642aa5": "reading",
    "41893fa4-f573-40d7-9a29-8cf886346495": "completed",
    "21de0bf0-ea12-4b21-85df-2b09461e44d7": "completed",
    "425f2ccf-581f-42cf-aed3-c3312fcde926": "plan_to_read",
    "f75812e9-27bb-44d5-9cb1-25de07ceb326": "plan_to_read",
    "007ececa-e5d1-471d-9f16-a21a73481164": "dropped",
    "a4304d3b-191d-471f-8c78-353d403a35d0": "reading",
    "ba64bce2-ccc0-437c-87fc-aea738521e46": "plan_to_read",
    "36a4167c-0e0b-4d46-b493-3375ec8debe7": "completed",
    "4621892c-4b3e-4064-b033-5700f5f63b41": "completed",
    "9fddf363-804b-42db-b840-67386d4c035f": "plan_to_read",
    "051812df-1d1a-4758-b76d-8771d6bd46a7": "dropped",
    "a25e46ec-30f7-4db6-89df-cacbc1d9a900": "plan_to_read",
    "76e17aaf-b32c-4a06-9709-74c1ae37868d": "reading",
    "3a1d1c65-193e-4dbe-be4d-2fb34bf7fab1": "completed",
    "dd61e175-96e1-4f30-a765-1b064a3fe4d8": "completed",
    "c9a68c3d-cb2f-4d86-aff5-14eb3218d493": "plan_to_read",
    "131a1695-5f60-4ffd-a3ea-08d9e7818bcf": "plan_to_read",
    "3ef34f35-a3f9-47c1-9ec4-75710ef84fb3": "completed",
    "f7ad9503-0fd5-4179-982a-7cb8030792c5": "dropped",
    "a0880b76-9d26-40b6-94a0-740fe31ead50": "plan_to_read",
    "6187d5a4-c20e-4f08-9210-5ba234f58988": "plan_to_read",
    "1f07bed6-7431-4ea1-a69a-a0cd6bd7fceb": "plan_to_read",
    "f2c1b1f6-4878-4ce9-a206-bd930d9a4a1c": "dropped",
    "ee69633b-b471-4eb1-b824-40df416cc638": "reading",
    "18990219-4e9f-4c9b-8f6c-2368a765eeb9": "reading",
    "99293af2-7810-4e30-9a13-d12306b05b91": "completed",
    "f7f430ab-2c24-49d3-b698-c9ff4787805b": "plan_to_read",
    "59920651-cada-445a-bc1d-79ae45eedfc8": "completed",
    "87096c42-9bf6-416c-a354-2e4b1739152b": "dropped",
    "89daf9dc-075a-4aa5-873a-cc76bb287108": "reading",
    "3ea7e763-654b-46a6-9c36-6afbed1baa47": "plan_to_read",
    "897959ff-cc94-4627-a9c5-ac13af5ba89f": "completed",
    "3f14c5f7-8179-40be-a65f-8b4a01f7ea26": "plan_to_read",
    "a9d193fe-5561-44e9-af8e-cafe30535f31": "plan_to_read",
    "c9c4c773-1403-49f8-bd73-ca60611cb334": "plan_to_read",
    "60809da4-1b9e-4176-86b0-c92cbcf3f1b4": "dropped",
    "c7421641-dc50-4a3c-80a5-5cdcb2cae890": "reading",
    "33ab3674-1fba-42f6-8531-86cf04ab39ca": "completed",
    "99e6cc89-14ea-4a17-b0ce-cef7498fc218": "dropped",
    "dd307066-8a67-4c93-b920-0ee342f5dd35": "completed",
    "af737f18-6d40-4537-b0e6-ad32f2054daa": "plan_to_read",
    "fb11a97e-490d-4dda-a195-c7fbaadcc968": "plan_to_read",
    "af6b26ab-b3dd-4e87-8a7a-7fd988482eb2": "completed",
    "bf790a7b-d45e-46bc-91de-79d636ae9704": "completed",
    "ac3e127d-609e-4746-a5eb-4834954727f7": "dropped",
    "228a5457-7da0-432a-85f4-e011877230a1": "dropped",
    "58adad3f-1770-4fbb-8645-935ef830a8db": "reading",
    "299e07f5-7431-48ec-aa91-781e4d228d90": "completed",
    "55ace2fb-e157-4d76-9e72-67c6bd762a39": "reading",
    "2193e82e-ae7c-4f5e-b498-f96090784688": "reading",
    "12ac16ec-8894-420b-bc03-eade9340dfd8": "reading",
    "7c418a1c-9241-451e-995a-31f673b4340a": "plan_to_read",
    "04fe6d31-460f-41f3-b56a-5e4f7659afa5": "plan_to_read",
    "ebca9d76-09c1-4815-bc4f-070f67c5b26c": "completed",
    "d3d6b0ea-1d1e-4814-8cf7-263d8585b1f8": "dropped",
    "259dfd8a-f06a-4825-8fa6-a2dcd7274230": "reading",
    "b72d9dae-3b0f-4dd1-bc16-bde81eab3c3d": "plan_to_read",
    "4d016c8d-5b4a-4a62-82a9-7ff4f86156d3": "plan_to_read",
    "dbadf5f2-725e-4d45-813b-b09252f35a20": "plan_to_read",
    "bfd55efe-1980-4d97-8d0c-e1e944a94d7a": "dropped",
    "ee7a22fb-1b18-453f-b61f-5e1c393aa3ad": "plan_to_read",
    "90ea8757-c0d8-42f1-b4a8-4594b5065eb4": "reading",
    "ae4d5376-b1b4-4c0f-b925-a4cc985d5a8e": "reading",
    "3bcc56f0-1b71-4542-b7b1-74db4fab2d72": "reading",
    "5f7c27d0-7012-460e-83a0-020297244490": "completed",
    "d85cb6a1-4bbe-4fa8-a18c-093fee1c7b4a": "plan_to_read",
    "920ffa6d-20f8-41fb-809a-7ec37818843c": "completed",
    "aa961395-f49b-4dc5-819d-b231ef75dbfb": "completed",
    "f4b7adfa-5f91-4a96-ada3-da071ed93d81": "plan_to_read",
    "b71a931d-2b98-4ff0-9fd4-e385e897f54e": "completed",
    "a64dd18b-2760-4a47-83a3-38119264fa1e": "plan_to_read",
    "bb279ab9-b875-40db-b849-73d3280cad9d": "completed",
    "da7bb886-7e6b-4174-83a9-2c478475b846": "plan_to_read",
    "eff87780-93d9-412e-b831-c731787e9bea": "reading",
    "69060a67-1d4e-4110-9d29-838bfd99917f": "plan_to_read",
    "cef30025-1671-4558-95ca-3585af9480fc": "dropped",
    "e326d469-7b63-40c0-9c44-09e8dd77e32d": "completed",
    "ca200b90-2fb5-44f9-90de-8fda4058f734": "reading",
    "5e147a0a-948b-4fcd-bcb6-b77faeec7692": "plan_to_read",
    "0bf5e730-2aa8-4435-801d-0494f45cbb28": "dropped",
    "7d32ba73-def9-4ef5-a062-00de9f5dec7d": "plan_to_read",
    "513ad1c7-8277-4fb8-a83c-a946514e319f": "plan_to_read",
    "4e8e67f0-a907-4f86-a492-a9b3c697f437": "completed",
    "517b19aa-0243-4c55-85dc-eafd6318bbc2": "completed",
    "82d90da0-207e-47ca-9184-a9a3a117787d": "plan_to_read",
    "b692e50e-6a5e-4afa-a85f-7d233d871bc0": "plan_to_read",
    "e18fe8c6-f6dc-4f05-8462-7b2083ff9a6c": "reading",
    "54eed888-51c1-41de-8b00-7eb65b832234": "plan_to_read",
    "62eec846-a18f-4a09-9c9f-759270347a39": "reading",
    "bbbfd6ee-bc97-42c8-bd6b-0d116a893b03": "dropped",
    "107b4226-36b4-4e89-92b1-087ea9814763": "dropped",
    "af78e5b6-2a61-4645-a0ca-4887c40dea23": "reading",
    "6e445564-d9a8-4862-bff1-f4d6be6dba2c": "plan_to_read",
    "8946189d-682f-4838-9c2a-3c2dd5132f2c": "plan_to_read",
    "ddb80900-12c2-4b9e-bfb7-cb8abc082f9a": "plan_to_read",
    "7c4ffbcc-8665-45a8-b85b-dc4842e55bf1": "plan_to_read",
    "7df1f449-d3e9-4507-9fb3-18d6238d76fa": "dropped",
    "4f003537-10bd-4808-8d3a-bc3dbcf815ee": "dropped",
    "7dcf0c15-aded-45c2-9eb1-69360424cae9": "plan_to_read",
    "eb291072-78cd-4d29-97f4-8e3cc5436d95": "reading",
    "d0bd55bc-b8d5-4852-95f9-3963325e5e56": "dropped",
    "71d056e1-e9f5-4030-80ae-4a26e14dbc49": "completed",
    "16674a04-fb1f-41ac-aed1-f3e71a87d3fb": "completed",
    "4e3da75b-1deb-41ff-9f5d-ef26f15efa11": "reading",
    "fe959bd4-2acd-487f-8709-f7fde3ff7b0c": "plan_to_read",
    "08ff391a-7991-4c43-8741-531d7d0b2165": "reading",
    "735eb543-4207-487d-8a64-9083c3eeb2e5": "reading",
    "e796bafa-4024-4772-a199-449b07e69978": "plan_to_read",
    "6204ff54-c3d5-4645-b21f-f83f6fa303d0": "reading",
    "ea8b180c-227b-4e72-b527-73963f7a9bcf": "dropped",
    "eb2d1a45-d4e7-4e32-a171-b5b029c5b0cb": "reading",
    "37cbe8a9-4a2f-4e71-a8c8-c33be7aee3cc": "plan_to_read",
    "672468c2-ee08-4c73-83d4-5d0035cb226c": "completed",
    "e5ce88e2-8c46-482d-8acf-5c6d5a64a585": "plan_to_read",
    "c7258373-0d3e-4ad1-9c98-1d18ba92aa29": "completed",
    "6b92ea1b-4f46-4950-a731-f8de48bd66e2": "dropped",
    "4933c657-3abc-4ffa-9496-189d5b388de1": "dropped",
    "6670ee28-f26d-4b61-b49c-d71149cd5a6e": "reading",
    "87a7705f-fa93-4353-867f-dde9a26799af": "completed",
    "ea56940a-683f-4c5e-8006-8a75f6bc74a4": "plan_to_read",
    "4a4c5edb-3fe2-42c4-920e-9119a72067cf": "completed",
    "78ee2f16-16aa-4d1d-9789-f3ce3d062155": "completed",
    "af906856-ef0c-4c7a-aa61-27edebe9e834": "plan_to_read",
    "3dc6d3cc-ad0a-4d5f-953d-6f7c737b857a": "plan_to_read",
    "6ce4c88e-381e-4c4a-a858-7585fff92f47": "plan_to_read",
    "e171c073-4415-499b-85bc-ea93825127ac": "plan_to_read",
    "ad1fdf0c-eb11-4c52-a657-98f6b4664a41": "plan_to_read",
    "fdfc9ba2-b21c-4f37-b5bf-4382f3d1318f": "completed",
    "f09627e2-f585-46e4-b391-f7bda4c757da": "completed",
    "2e3ec8e6-cee0-4779-8f4e-c42ab683ef75": "reading",
    "8bd50e0c-f9ce-4f84-bc9a-95c597a7aed4": "reading",
    "c2576b49-f494-4a13-8ecf-4e85ec42c477": "plan_to_read",
    "f58f2041-ed9b-4fe6-8d7b-bdfdb796f86e": "reading",
    "8e8b5e4c-6221-4fb5-a70d-1e21da51034a": "reading",
    "e10c02da-e7a3-40e2-8b3d-c6f769d4618c": "reading",
    "b37739bc-8bc8-4a3a-b23a-eb84c6545ad2": "plan_to_read",
    "d539ab98-2774-4cea-a764-a6cc55fa8b68": "dropped",
    "cade38b7-64c4-4a29-8e3c-8c283291d6c6": "reading",
    "a781de8e-0935-45bd-bc33-cbc76ea8c6f9": "reading",
    "e49fc1b3-81e8-4c8e-a2e2-a3cb635d3008": "dropped",
    "c0ad8919-4646-4a61-adf9-0fd6d8612efa": "completed",
    "f736cce8-888e-49ff-9505-afc5853ebc04": "plan_to_read",
    "7a90b557-b6c6-4753-88d0-c3b29798f38d": "dropped",
    "55a25a79-59f6-45cd-b6c7-2e059b457a4f": "dropped",
    "f09f5515-dec7-434f-b38e-dc3bba107efb": "plan_to_read",
    "fcf1aa35-4891-46a3-9874-f1823ddac415": "plan_to_read",
    "63669b75-6007-4cf1-8f4e-1414e720806e": "plan_to_read",
    "79b8cb8e-554d-49c5-a6fa-69b4eff69e1e": "plan_to_read",
    "1206375c-9cbf-4455-b933-456b1141aa4a": "completed",
    "a1191ee7-3db6-4f30-85ca-949800e88210": "dropped",
    "0bedc5d1-61c4-43c1-8ea1-0c9256d1c48c": "plan_to_read",
    "975f3334-8395-4393-84a2-50fcaccbcdc0": "reading",
    "631f996b-3541-470c-9f18-ed02a447c64f": "dropped",
    "9a1ce2bc-d968-42e0-bbad-488310cd69f5": "completed",
    "1aaa0a4b-78bc-4f39-aa20-145766f83092": "reading",
    "8d163365-15a6-4031-8671-29a11e3b6d69": "plan_to_read",
    "62c5fdea-951e-4ccb-b45d-dec3257f2ff1": "plan_to_read",
    "7350be91-b5e1-467d-89df-a089d014d20b": "plan_to_read",
    "f26e769a-6cd0-4933-9e8a-84544e10bd0d": "dropped",
    "f39ab2d5-9156-4cfd-a0cd-4f89d74cb096": "dropped",
    "1d44fa52-e344-42bd-9182-7b5887e1fe2c": "dropped",
    "fdb3ae24-7e0d-4fa9-94e2-b194ee4d8217": "plan_to_read",
    "d86cf65b-5f6c-437d-a0af-19a31f94ec55": "plan_to_read",
    "7278cb4f-89c2-4e99-b268-6eeadf67f1e9": "completed",
    "91b630d7-a513-4c75-97c2-27e9430b2f8b": "plan_to_read",
    "b66e4904-bae9-4e57-995a-4b922bf78435": "dropped",
    "009b6788-48f3-4e78-975c-097f54def7ab": "plan_to_read",
    "fbe57225-e455-4680-b2b9-5b8b82a1be9e": "plan_to_read",
    "0f237a5f-07ad-4e43-bbd9-2a320694434d": "dropped",
    "5e49b64c-37b1-441a-acdd-9b02913ef907": "dropped",
    "6136a1ce-3cdc-487e-9f2b-4190b95c35ef": "completed",
    "9d3d594f-c68d-43ff-b392-398cbe62541d": "reading",
    "b9d856a3-9441-4f88-b134-9e8c6033a1ce": "completed",
    "5eb1e122-f4bc-4b69-8ab1-906cdfb245a0": "dropped",
    "2f2791ae-2a30-418f-a173-db2263c2d0ae": "plan_to_read",
    "078309e3-40cc-4584-822e-ad4577336d58": "plan_to_read",
    "d1a53bf1-b099-4a0d-83a7-cd6f4927a144": "dropped",
    "0432bd8c-a475-441e-865a-3489d591b593": "plan_to_read",
    "b17a0512-c8af-4cb3-abfc-0dea26bfccb9": "plan_to_read",
    "3da17cce-8094-4947-a215-e04340beaa5d": "plan_to_read",
    "e731726e-5c9c-4fe1-bfc9-bd8edfea568c": "plan_to_read",
    "7cab67bb-7fe4-4800-8cc7-ad36a4f7c20b": "completed",
    "fabfd1d5-6ddb-464f-a9dc-8a694ff464ab": "plan_to_read",
    "a5e920a7-81c3-4703-bdb7-c8d0b24920b1": "dropped",
    "6fe56296-e980-4321-8a7b-bc8b4e2750c8": "plan_to_read",
    "113fc5d3-9cf0-4d55-8a00-76f1e9e24120": "dropped",
    "67e7453b-9ee5-4ae5-9316-215b03e4a71d": "plan_to_read",
    "9417ab7d-b231-4481-8279-34a873cc820f": "reading",
    "0861e776-968f-4549-847b-7e33c6d6555e": "plan_to_read",
    "0e017a08-835a-4cbe-ba63-576d5010a5a0": "plan_to_read",
    "a1947d48-8887-41f4-8f69-fc9651a0016b": "dropped",
    "acf323c4-081f-4155-9745-da5531c78674": "dropped",
    "69920560-3c41-4536-9a48-39a1c1a58d8a": "dropped",
    "fce457ea-1275-475d-91a7-1a21074c326c": "completed",
    "d0c9ee26-5b00-4326-bb1c-170f2a5b0ff7": "plan_to_read",
    "d60051c2-79de-4c72-821c-a2be3fc44580": "completed",
    "1ab5f7e0-7768-457c-9f63-19471b6503cc": "plan_to_read",
    "1205e6aa-dc67-4a96-b8e6-18cf22a307aa": "dropped",
    "0176e6dd-a502-465d-8f43-70b6b2118276": "plan_to_read",
    "f81026af-1b41-465c-932b-291ce4760c00": "dropped",
    "f13ab102-fc55-4afc-8cd8-d2515c28eb10": "dropped",
    "517fa7a9-ec67-4628-acc4-2620f753d424": "completed",
    "a2febd3e-6252-46eb-bd63-01d51deaaec5": "plan_to_read",
    "ab65d859-f48f-47ab-a4df-eb63700f66cb": "plan_to_read",
    "f975338c-14d6-4467-9322-678ed0808c6f": "completed",
    "d4c2d0ec-03ce-4f18-81a7-93cffb7e74f5": "dropped",
    "c05e0f87-160d-4e4b-a68e-ae3fb91c837a": "reading",
    "2cd77181-42f1-434f-91d4-78bc5fbf8eb4": "dropped",
    "669243b1-3a6c-4e25-9857-f57eee9ce18a": "plan_to_read",
    "9d351a80-5037-4334-a020-6985899f5b1f": "dropped",
    "ca98fe66-7b88-49a8-83b0-511fca029237": "plan_to_read",
    "26c6bf0d-036e-4bf8-b336-edf13f93dd1d": "completed",
    "cc70ba46-e0d4-4240-98ba-adb86c82ff6b": "plan_to_read",
    "1a23bfac-634f-4be0-9085-4197a4e9610a": "completed",
    "d7d6829b-ceab-4346-a033-22387aeff297": "dropped",
    "d8f1d7da-8bb1-407b-8be3-10ac2894d3c6": "reading",
    "c91a0c23-6ced-4407-a1b6-869abf73a2ca": "plan_to_read",
    "2c3cd370-04bd-4994-87dc-e54a4d80c4ec": "plan_to_read",
    "ef4b0094-cc78-489f-978e-d56e0ff28347": "reading",
    "a5d3c8e2-70dc-4108-afb5-08be57803a60": "reading",
    "3b3e7ec9-5003-49fe-bf89-7093f883ee2b": "dropped",
    "78dec182-5327-4942-90bc-532fea2b752a": "dropped",
    "d381ddae-cd50-4259-9cc6-0fc1cb194a4b": "reading",
    "77fd8118-61b0-4b1f-95a6-2b839d754f81": "reading",
    "e12f9be6-1d07-410d-8a07-a4af14d30e63": "dropped",
    "9f0ce0a5-c686-4a3f-b227-5cfb68838de2": "dropped",
    "b86bb86b-a377-467b-a01c-ec29134ac036": "dropped",
    "25cac231-6748-4ae0-805f-56dce80fbdbe": "plan_to_read",
    "b0b721ff-c388-4486-aa0f-c2b0bb321512": "reading",
    "a52fb557-f9c6-46fd-a460-0ccafa826f78": "plan_to_read",
    "6a80c457-cea3-49a5-9a60-0ee0e5ad4cb5": "dropped",
    "3512d948-2886-4a9a-b0dc-44e02bb67c87": "dropped",
    "5927e373-f024-42ad-9307-6f4c05ea3fc4": "plan_to_read",
    "64ab62c3-2edd-41cd-a4da-96cbf0907e03": "plan_to_read",
    "e692bcd9-2b61-42f3-a259-f1cdbc1c6ab7": "plan_to_read",
    "bd6d0982-0091-4945-ad70-c028ed3c0917": "dropped",
    "5b8e38d3-e0db-46f6-8fdc-b1acd8b167c8": "dropped",
    "c6bbbeca-f4fd-4595-9d4d-4ba31370d08c": "plan_to_read",
    "99182618-ae92-4aec-a5df-518659b7b613": "plan_to_read",
    "e3d84c49-1680-42b5-a7c9-5dfde5260cc8": "reading",
    "c24beff7-bf40-4ee2-a39d-d4f2b4e86026": "reading",
    "12e28a8a-cbfe-4e12-bab8-b6fb0b9a59b4": "plan_to_read",
    "752ed7bd-78db-44c9-9b91-4acb2b4b60f8": "dropped",
    "1180743d-8e38-4c00-b767-c53169fadc6a": "dropped",
    "540a9c85-aefe-4263-bcef-68441b13ea35": "completed",
    "cd355881-6f89-4917-9a57-fc9f75377293": "plan_to_read",
    "feff4eaf-01df-4a05-83f4-68bb5cdf4fad": "reading",
    "d0c3d778-d28d-4e3a-be75-d92149438fff": "plan_to_read",
    "14610263-264a-4c22-8928-e4183e7d4719": "reading",
    "22439875-ccf0-435d-917b-e714255e27cc": "dropped",
    "ed996855-70de-449f-bba2-e8e24224c14d": "reading",
    "1a669416-d8fb-4dbf-99ee-586372769625": "completed",
    "f36ff411-90b2-4754-9d54-4cb140ec40d9": "completed",
    "bf2fed23-7174-408c-972a-af6d0179fe8e": "completed",
    "8772a20d-3456-4876-9d3f-ed0dcf489a42": "plan_to_read",
    "0bb0f4fb-5dc4-4f38-8de2-e2a2decaa37f": "dropped",
    "8b36ad5b-808d-4b33-b84a-02ab435f9be6": "completed",
    "780fd8be-bfc1-4d8c-83f0-1624a71c8f5b": "plan_to_read",
    "a3d681d7-a239-45a9-8446-5bfc61ca48fa": "completed",
    "0deefed7-4d99-43cc-8521-f1f703f63e75": "completed",
    "9b814784-b102-41a5-be22-2aa91f9ad4a4": "dropped",
    "1a1032fc-e8f7-425b-aa78-d9072f8de514": "reading",
    "34ff0e60-f22f-48c9-8cb3-4b3ea6d86afa": "reading",
    "8a772862-7d48-4fcd-b39f-bd1da186f1e6": "dropped",
    "f34188a5-2733-4a45-b612-cd60e192033f": "plan_to_read",
    "3be245b1-b183-4a74-880f-62244d7dc86e": "plan_to_read",
    "a7c13d5c-3a2d-4dc4-bcd7-74c79d05f88b": "completed",
    "30193c1f-1569-4c2d-8c29-8a365fec322b": "reading",
    "f7be9feb-66f9-43cf-8daa-b244c046e86b": "completed",
    "2fc6e547-cd3d-4030-a733-defc244df2d5": "reading",
    "af771453-d27c-49d0-bc17-55497a5222a7": "dropped",
    "0110603c-92ec-463e-8d13-7651211e492e": "completed",
    "8684d6c3-90dc-4091-bfcf-c303eebf4eca": "plan_to_read",
    "9e03b2ca-5191-44a6-88b6-c0cd49d06b51": "completed",
    "93227529-8619-47d2-9dfa-e5d023806ef1": "completed",
    "6dce3893-39ac-4e1e-a568-743809334616": "plan_to_read",
    "35091150-7d51-45e8-9200-849a17c6f94d": "reading",
    "1f40b922-6abb-418e-a7e9-cc4d25b21439": "reading",
    "a96676e5-8ae2-425e-b549-7f15dd34a6d8": "plan_to_read",
    "d4ff7502-b5d4-4fd2-845f-c8754b14dd8d": "reading",
    "9e2707b8-b723-41de-a608-4e4d9ce2f99c": "reading",
    "b89882d5-e2c8-457d-8b74-a70bf0b36b7e": "dropped",
    "420fac61-50f6-43ee-aa31-5cdd02d68833": "dropped",
    "ddc6b72d-3565-4d75-ba1f-a9360ddb39ba": "dropped",
    "56f9943a-d4a7-4167-9654-32a09763dfd7": "plan_to_read",
    "2f4e5f5b-d930-4266-8c8a-c4cf9a81e51f": "plan_to_read",
    "667f1e8e-7643-4f2f-a3f0-8ec39a4340bd": "dropped",
    "71e6668e-a7e9-47e6-af41-6ea97475d49d": "completed",
    "419d21bf-1361-459b-8341-6ec828087f26": "plan_to_read",
    "2b3c0481-d2d8-4967-b862-1061f68b1f05": "completed",
    "30f3ac69-21b6-45ad-a110-d011b7aaadaa": "plan_to_read",
    "a3ebdf54-8715-4bd8-a1cf-fb0c3cc3d849": "reading",
    "3a8d7ec0-084a-401c-9c31-34e69e0fbb57": "reading",
    "2fe8a86e-fea0-4b6a-9e6a-41f39e0ecb04": "plan_to_read",
    "4002af95-b501-4cce-b1bd-ccf0b21d5bdc": "plan_to_read",
    "c0ce12a1-1705-46f8-8bae-0f03fdea5de3": "completed",
    "6cac6915-b058-43b0-ad6c-305144c78627": "reading",
    "4a24d711-53ca-4a6c-84d6-78ef91ba2dff": "plan_to_read",
    "b156b9a0-4bcf-49ac-97e2-7232addd134b": "completed",
    "6e44705b-9f80-42f6-9ebb-1141fbe8320e": "reading",
    "5b9855fa-9f7e-4c42-9bf1-84a68c107218": "dropped",
    "ddcebfa2-05a0-4fcd-9cd4-60d779c38f2c": "plan_to_read",
    "774bf5a4-fb10-4179-b2cb-5e2b1b2a0ca9": "reading",
    "10eeeec8-6430-42c8-9c8d-ad163da276cf": "dropped",
    "0ad1c29f-1634-411d-9615-1368991048f1": "plan_to_read",
    "2763d9ed-d9d3-4bf0-a656-aaad8f2cae98": "plan_to_read",
    "1e01d7f6-c4e1-4102-9dd0-a6fccc065978": "reading",
    "9bbd5477-fe67-42a3-97a0-09327ea88366": "plan_to_read",
    "e75c8053-00ed-4635-8535-2e976b4be2b0": "plan_to_read",
    "872f1c0f-a42a-466a-b80e-6faa744707df": "plan_to_read",
    "e3f6fd44-d500-4aa6-854c-02ac3440bcda": "plan_to_read",
    "80c4c4bc-be9c-400a-8cc0-57b1d0b8a87f": "dropped",
    "3fc38ebd-50ef-4788-ae51-a24c60036dfa": "completed",
    "d90ea6cb-7bc3-4d80-8af0-28557e6c4e17": "plan_to_read",
    "348966d0-c807-45cf-9260-8adf006a9da6": "plan_to_read",
    "3ecd78d9-c686-46f8-8e74-d91a3d7e7958": "plan_to_read",
    "1e4d90e0-4fbc-4277-8a70-9163516a41ca": "plan_to_read",
    "10227f74-9134-4262-b01d-8966bc149c4d": "reading",
    "b0c50912-623b-4bd7-84fc-7811f7961518": "plan_to_read",
    "70cc8d60-d4a8-4c7e-a1e2-eb8e05ff9c3a": "dropped",
    "5bde185c-5583-4603-8588-0355dff585ba": "reading",
    "0e0daf05-706d-412d-bc08-e4e4f9da8b35": "plan_to_read",
    "f77aca92-0b8d-4583-9294-8644f71b1e01": "plan_to_read",
    "32e0b8d5-f7de-4d6a-871b-2dc69dfe4251": "plan_to_read",
    "78bc1323-934a-4bbc-8ad9-a370c3d85468": "completed",
    "d763fa86-dafa-47ae-aa79-b5b8390e0ab8": "completed",
    "3c0ea6e5-2202-4e18-82d8-2a078e0ac336": "reading",
    "a4b39b6e-a448-4644-a540-64ceff1d8305": "plan_to_read",
    "3b5c0def-79ae-44e8-9d71-9aa2e83f9a9f": "plan_to_read",
    "4187856d-65a9-4fb4-98ec-84c0bf16631f": "dropped",
    "7dcd9347-1a09-4812-8fc6-5247cc509740": "completed",
    "c368efc7-c071-499c-90d2-dc0b22e42853": "plan_to_read",
    "4f3da322-7be8-46fd-94b9-e18c9fd206ba": "plan_to_read",
    "cc1fc741-8ba5-4a18-9843-5d59d8a98d0d": "reading",
    "d773c8be-8e82-4ff1-a4e9-46171395319b": "plan_to_read",
    "50d9f5b3-fc69-4742-bd72-1d652c337cf4": "dropped",
    "b8aac098-82cb-4507-bf5d-842071e24ed0": "completed",
    "c904ac3b-6437-46f8-94cf-b21f72bc3f54": "plan_to_read",
    "6dcacd2d-9890-4f93-8d22-5752e553c6f2": "completed",
    "bdf7eb9b-ed05-447b-aa6c-2d4a6652016a": "plan_to_read",
    "96a24520-7403-4f28-b821-922e1967e08a": "plan_to_read",
    "5ab9bc15-bcd6-408e-874b-19e29d3c67d3": "dropped",
    "733fc3ac-deca-444e-bb79-14186e00ccf1": "plan_to_read",
    "475ac860-8a11-4972-8cea-1e82fb6738e8": "completed",
    "af66b380-623e-4dfc-9fbb-8ca093b9d5a9": "reading",
    "12968534-b5e3-40df-9daf-a939f5586b16": "completed",
    "6cc77b74-4c4a-4a58-9ae1-682471d50840": "completed",
    "25e145f0-a74f-48b6-9d89-b715e28f6417": "reading",
    "f67cf0dd-093b-4c92-a96c-20f75ca56f0b": "completed",
    "19465f6a-1c11-4179-891e-68293402b883": "plan_to_read",
    "b443ff38-f6ef-4100-992e-dcdcfb842044": "plan_to_read",
    "51c02b48-7596-40e2-93d1-3b877fa87cbc": "plan_to_read",
    "20fd49ae-0e6f-451d-94ca-00aa780f3897": "reading",
    "65498ee8-3c32-4228-b433-73a4d08f8927": "plan_to_read",
    "4b7339e5-f7fd-4177-8da3-ad6c0bacafe4": "completed",
    "4080db42-038f-4f6b-a8ab-0ddc71183e1a": "plan_to_read",
    "6d6d9fda-5cd3-40ac-948b-776b1a1a0eb1": "reading",
    "4b92ad2e-e451-4aad-a330-b2d1c2318af1": "completed",
    "4304a738-21c2-497a-8952-16deabc87fa1": "plan_to_read",
    "228e2786-d9fd-4969-9fb8-30753e9ad11a": "reading",
    "cbb99e93-a9cf-41f0-b68d-9731333b0e89": "plan_to_read",
    "02adf3a3-210f-475a-889f-1db74c58e1f5": "dropped",
    "519a8d57-2c3a-4da3-9873-ee8165830eb8": "plan_to_read",
    "bd413470-2326-4da7-87c7-729675be0f18": "completed",
    "a66647d8-8549-4354-9f3e-a5c8389ebf1c": "dropped",
    "665766a3-905d-4a71-a90a-bd2c75d1a81f": "plan_to_read",
    "89ed3ec2-ebe6-4d6b-92eb-d753a8bb365e": "dropped",
    "c26269c7-0f5d-4966-8cd5-b79acb86fb7a": "reading",
    "583caff5-23f7-41d9-b798-a263bf1d0165": "reading",
    "5e77d9e2-2e44-431a-a995-5fefd411e55e": "completed",
    "cc22090f-010c-4933-91eb-c473c6a8feec": "completed",
    "473a1d69-0ef5-4882-a45b-ca55c181ce86": "dropped",
    "91503d4c-16d6-4962-9eca-93557667066c": "plan_to_read",
    "9643f5da-c7da-4705-ac5b-4b4a4c7a649e": "dropped",
    "6542eb7b-a3c4-41c2-aeb1-b8ab8a374f13": "completed",
    "58563834-c4ca-4485-968f-de08ecc416d2": "reading",
    "57a981a8-fa23-48c5-971b-1329e3d9bb0b": "dropped",
    "63c6a6ea-0e1d-4232-bdd7-d829258285e1": "dropped",
    "58e4ff61-f774-48f9-8e00-aa82c27c513f": "completed",
    "8b7e5dcb-4ea1-46d5-99e3-805e2e33088c": "dropped",
    "a2f193fe-5499-41f3-be15-cec64885ef92": "completed",
    "6bae5c8c-d5ff-43df-acf7-b7670532c8b1": "dropped",
    "2356f5ff-143f-4e3b-96e6-9d9f5efab8c5": "dropped",
    "8d3022fe-db48-49ba-92ce-8d4c813e8ba4": "reading",
    "dc5b9e42-1840-4307-998d-e0dfcfe2b9e6": "plan_to_read",
    "75fb2312-1a4d-4bc5-8034-9ad2802247be": "plan_to_read",
    "fd604f6e-a784-4c6b-ab00-565a996c33f8": "reading",
    "1e6ef441-f72b-4337-94d5-73b111406a3e": "plan_to_read",
    "f42f3212-f2fd-4479-9d82-b9c55eaec820": "plan_to_read",
    "3537c9ed-b8bb-456d-95ff-66e3d8595058": "dropped",
    "f3e94526-319e-44b8-ba7e-6de65d2ba196": "plan_to_read",
    "8fe5cbe9-c968-4e89-bc5b-b16a4420c70c": "dropped",
    "bdc9c0f8-468f-4f89-87bc-eceadd21551d": "dropped",
    "119f5a65-4cd7-44ac-93e7-5d7e7fcf86a2": "plan_to_read",
    "3537cfb7-70d8-4da6-8793-4c95e5c6393b": "dropped",
    "50da13db-a65b-4864-8eef-e0c8349919d9": "completed",
    "b32ce72b-cf37-4cf7-8600-ba021598ddff": "plan_to_read",
    "f9448f90-c068-4b6a-8c85-03d739aef255": "plan_to_read",
    "d44c8d22-934c-4a4a-9346-0afd21264cca": "dropped",
    "893183a0-27f3-4607-ab80-22be51ea25d9": "dropped",
    "0b0cf9fe-fb33-495f-9151-994968de8421": "completed",
    "d8693c4f-2ba9-4a09-af4e-6b518dd15963": "completed",
    "fa84dd46-43ca-4594-a953-e8061331d91d": "plan_to_read",
    "8ed64a29-8787-499b-9430-53bc0db80f73": "plan_to_read",
    "211242a7-8913-4bbf-9ce2-ef51dfff6a0c": "completed",
    "5c7f1c2c-12d5-45c4-b9fc-4c40ed1d1fa7": "completed",
    "a4c07e8e-2dfc-4f77-8579-466b20129b14": "plan_to_read",
    "f1311d54-99bc-49ed-b12f-099b9a40c104": "dropped",
    "52f45f55-19a7-441c-926d-cfabb266f0a7": "completed",
    "1a13ecb4-d893-45e0-a697-052a9e158f7c": "plan_to_read",
    "e572564d-3e18-46d3-8ecf-c050635b62c0": "reading",
    "0a3bb14b-7674-4af7-a82b-0ecba4de45a0": "reading",
    "f6333441-3ee5-4ac9-a238-19ca5afe79af": "reading",
    "d2746874-023e-4a24-9257-dd8130f98281": "dropped",
    "d5f06ae1-23db-4a25-b7dd-41b8dea44a7b": "completed",
    "6fef1f74-a0ad-4f0d-99db-d32a7cd24098": "plan_to_read",
    "67ca1083-ec62-4f66-a2f5-355a2702f6e3": "reading",
    "15e8520c-ef7c-4cc4-adae-cfb950979513": "plan_to_read",
    "bae4c826-73e0-40f1-875e-73f00c815968": "dropped",
    "248525ed-ad1c-4ddc-a834-5d6ce66a3ad2": "reading",
    "80422e14-b9ad-4fda-970f-de370d5fa4e5": "reading",
    "801513ba-a712-498c-8f57-cae55b38cc92": "plan_to_read",
    "5e433b63-7faa-4106-8ec9-802282f322b1": "plan_to_read",
    "8a7992ca-634f-4625-ad41-8d2e75003f5b": "reading",
    "a992efe2-752e-47c4-b2f0-6923cb3b2b16": "plan_to_read",
    "bb1d3f5a-ed03-4eac-b6c6-7c379e0c5ff8": "reading",
    "5cca51a5-8da3-4f6a-8df3-3b5f5f98dcdd": "dropped",
    "88e3559a-8da6-426d-a4c4-e70372537017": "dropped",
    "0123dd7a-8fb9-4004-a001-787598f93d38": "plan_to_read",
    "104c84c6-9de6-497d-ad52-bd5ff1a0f0fa": "dropped",
    "a220cb1c-cec6-42c1-b038-bf1ef64190d8": "reading",
    "1d4e3c56-3e9f-4a50-a9ed-417fb87f1911": "plan_to_read",
    "9ed8c4a9-aa21-48ba-9389-359c984ae2d2": "plan_to_read",
    "16836fe6-b330-4924-92f3-87dd5def5ec1": "reading",
    "efd02206-1cd8-4823-b497-02bb8b8d09ca": "reading",
    "510f29a8-99b4-46af-ba5e-916e96bc6f37": "plan_to_read",
    "a1343483-8779-4b6f-b919-9025a89d98c3": "dropped",
    "d32616cd-7048-434a-86aa-47902af61b5b": "completed",
    "59a592fa-91fa-4486-a05b-8c947a1b20eb": "reading",
    "f0ec4a00-918b-443e-a865-6c0c27f4d625": "dropped",
    "05ff9abc-92d1-480b-a87f-02768075fef5": "dropped",
    "66b52a3a-40b7-4488-9d85-1d3b2a5c550f": "completed",
    "838e5b3a-51c8-44cf-b6e2-68193416f6fe": "plan_to_read",
    "c4dd41fd-5cd4-4b43-a071-1e6b0c150a66": "dropped",
    "136a8c13-cf72-427a-8d76-23f1bf070c0e": "dropped",
    "b787bfae-7b1c-4964-a910-718529bbd377": "reading",
    "20155eb0-c25e-454a-b096-a6537aec1b96": "plan_to_read",
    "e61152b7-b5d1-427f-a62f-94368edc30f0": "completed",
    "bcab1d1d-029f-439b-893e-6e8553b007ba": "plan_to_read",
    "af38f328-8df1-4b4c-a272-e737625c3ddc": "plan_to_read",
    "9153a75a-4e45-48c9-a84d-74a9a3fe432c": "dropped",
    "3aa6cd45-a36e-4abd-ab1c-f60f1db0014a": "reading",
    "e97d4b6e-c232-4f27-b2c4-3131eafdc8fe": "completed",
    "0a21f058-4c17-46c3-9227-ab96314211c4": "dropped",
    "e975754f-57db-4dbb-ba59-f744e45bdf5f": "dropped",
    "d3731564-c453-4486-b24e-567a3ad3bc2e": "dropped",
    "52d4ad1e-d02c-4fef-81d6-1e758e699d31": "plan_to_read",
  },
};

const followedManga = flatMap(response.statuses, (status, id) =>
  status === "reading" ? [id] : []
);

async function fetchManga(id) {
  const request = await fetch(
    `https://api.mangadex.org/manga/${id}?includes[]=cover_art`,
    { cache: "force-cache" }
  );
  const response = await request.json();

  const mangaId = response.data.id;
  const mangaTitle = response.data.attributes.title.en;

  const coverRelationship = response.data.relationships.filter(
    (r) => r.type === "cover_art"
  );
  const [coverName] = coverRelationship.map((r) => r.attributes.fileName);

  const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${coverName}.512.jpg`;

  return {
    mangaId,
    mangaTitle,
    coverUrl,
  };
}

class App extends Component {
  state = {
    edges: makeMatrix(followedManga.length, false),
    pairs: shuffle(combinations(range(followedManga.length))),
    history: [],
  };

  #put(a, b) {
    this.setState({
      edges: set(this.state.edges, [a, b], true),
      history: [[a, b], ...this.state.history],
    });
  }

  #tie(a, b) {
    this.setState({
      edges: set(set(this.state.edges, [b, a], true), [a, b], true),
      history: [[a, b], ...this.state.history],
    });
  }

  #undo() {
    const [[a, b], ...history] = this.state.history;

    this.setState({
      history,
      edges: set(set(this.state.edges, [b, a], false), [a, b], false),
    });
  }

  #pending(pairs, closure) {
    return pairs.filter(([x, y]) => !closure[x][y] && !closure[y][x]);
  }

  #closure(edges) {
    const closure = cloneDeep(edges);

    for (const i of range(closure.length))
      for (const j of range(closure.length))
        for (const k of range(closure.length))
          closure[i][j] ||= closure[i][k] && closure[k][j];

    return closure;
  }

  #degree(node, closure) {
    return sum(closure[node]);
  }

  componentWillMount() {
    this.componentWillUpdate(this.props, this.state);
  }

  componentWillUpdate(_, { pairs, edges }) {
    const closure = this.#closure(edges);
    const pending = this.#pending(pairs, closure);

    const [[u, v], ...rest] = sortBy(pending, ([left, right]) => {
      return (
        (this.#degree(left, closure) + 1) * (this.#degree(right, closure) + 1)
      );
    });

    const mangaL = fetchManga(followedManga[u]);
    const mangaR = fetchManga(followedManga[v]);

    Promise.all([mangaL, mangaR]).then(([mangaL, mangaR]) => {
      this.setState({
        mangaL: { ...mangaL, index: u },
        mangaR: { ...mangaR, index: v },
      });
    });
  }

  render({}, { edges, history, pairs, mangaL, mangaR }) {
    const closure = this.#closure(edges);
    const pending = this.#pending(pairs, closure);

    return html`
      <div class="columns is-vcentered">
        <div class="column is-5 has-text-centered">
          <figure class="image">
            <h3 class="is-size-4 my-3">${mangaL?.mangaTitle}</h3>

            <img class="is-2by3" src=${mangaL?.coverUrl} />

            <button
              class="button is-link is-large is-fullwidth my-3"
              onClick=${(_) => this.#put(mangaL.index, mangaR.index)}
            >
              Choose
            </button>
          </figure>
        </div>
        <div class="column is-2 px-6 has-text-centered">
          <button
            class="button is-link is-large is-fullwidth my-3"
            onClick=${(_) => this.#tie(mangaL.index, mangaR.index)}
          >
            Tie
          </button>
          <button
            class="button is-danger is-large is-fullwidth my-3"
            onClick=${(_) => this.#undo()}
          >
            Undo
          </button>
        </div>
        <div class="column is-5 has-text-centered">
          <figure class="image">
            <h3 class="is-size-4 my-3">${mangaR?.mangaTitle}</h3>

            <img class="is-2by3" src=${mangaR?.coverUrl} />

            <button
              class="button is-link is-large is-fullwidth my-3"
              onClick=${(_) => this.#put(mangaR.index, mangaL.index)}
            >
              Choose
            </button>
          </figure>
        </div>
      </div>

      <div class="column is-full has-text-centered">
        <p>You've made ${history.length} choice(s) so far.</p>
        <p>There are ${pending.length} pairs left.</p>
      </div>
    `;

    // <ul>
    // ${sortBy(range(followedManga.length), idx => this.#degree(idx, closure)).map(idx => {
    //   return html`<li>${}`
    // })}
    // </ul>
  }
}

render(html`<${App} />`, document.getElementById("app"));
