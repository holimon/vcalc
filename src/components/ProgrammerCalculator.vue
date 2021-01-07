<template>
  <el-row class="top-expression-div calc-width">
    <span class="top-expression">{{ lastexpression }}</span>
  </el-row>
  <el-row class="top-expression-div calc-width">
    <span class="top-expression">{{ expression }}</span>
  </el-row>
  <el-row class="top-uniqueValue-div calc-width"
  ><span class="top-uniqueValue">{{
      numtoString(strtoNumber(curval, radix), radix)
    }}</span></el-row
  >
  <el-row class="calc-width">
    <el-col span="2">
      <el-menu :default-active="radix" @select="handleSelect">
        <el-menu-item index="16">HEX</el-menu-item>
        <el-menu-item index="10">DEC</el-menu-item>
        <el-menu-item index="8">OCT</el-menu-item>
        <el-menu-item index="2">BIN</el-menu-item>
      </el-menu>
    </el-col>
    <el-col span="6">
      <div class="line">
        {{ numtoString(strtoNumber(curval, radix), 16) }}
      </div>
      <div class="line">
        {{ numtoString(strtoNumber(curval, radix), 10) }}
      </div>
      <div class="line">
        {{ numtoString(strtoNumber(curval, radix), 8) }}
      </div>
      <div class="line">
        {{ numtoString(strtoNumber(curval, radix), 2) }}
      </div>
    </el-col>
  </el-row>
  <el-tabs
      type="border-card"
      class="calc-width"
      v-model="activeTab"
      :before-leave="handleTabclick"
  >
    <el-tab-pane label="全键盘" name="keys" class="keys-btn">
      <el-row>
        <el-button
            plain
            :disabled="keysDisabled(16)"
            @click="handleKeysClick('A')"
        >A
        </el-button
        >
        <el-button plain @click="handleKeysClick('<<')">&lt;&lt;</el-button>
        <el-button plain @click="handleKeysClick('>>')">>></el-button>
        <el-button plain @click="handleKeysClick('ce')">CE</el-button>
        <el-button plain @click="handleKeysClick('del')">&lt;-</el-button>
      </el-row>
      <el-row>
        <el-button
            plain
            :disabled="keysDisabled(16)"
            @click="handleKeysClick('B')"
        >B
        </el-button
        >
        <el-button plain @click="handleKeysClick('(')">(</el-button>
        <el-button plain @click="handleKeysClick(')')">)</el-button>
        <el-button plain @click="handleKeysClick('%')">%</el-button>
        <el-button plain @click="handleKeysClick('/')">÷</el-button>
      </el-row>
      <el-row>
        <el-button
            plain
            :disabled="keysDisabled(16)"
            @click="handleKeysClick('C')"
        >C
        </el-button
        >
        <el-button
            plain
            :disabled="keysDisabled(8)"
            @click="handleKeysClick('7')"
        >7
        </el-button
        >
        <el-button
            plain
            :disabled="keysDisabled(10)"
            @click="handleKeysClick('8')"
        >8
        </el-button
        >
        <el-button
            plain
            :disabled="keysDisabled(10)"
            @click="handleKeysClick('9')"
        >9
        </el-button
        >
        <el-button plain @click="handleKeysClick('*')">×</el-button>
      </el-row>
      <el-row>
        <el-button
            plain
            :disabled="keysDisabled(16)"
            @click="handleKeysClick('D')"
        >D
        </el-button
        >
        <el-button
            plain
            :disabled="keysDisabled(8)"
            @click="handleKeysClick('4')"
        >4
        </el-button
        >
        <el-button
            plain
            :disabled="keysDisabled(8)"
            @click="handleKeysClick('5')"
        >5
        </el-button
        >
        <el-button
            plain
            :disabled="keysDisabled(8)"
            @click="handleKeysClick('6')"
        >6
        </el-button
        >
        <el-button plain @click="handleKeysClick('-')">-</el-button>
      </el-row>
      <el-row>
        <el-button
            plain
            :disabled="keysDisabled(16)"
            @click="handleKeysClick('E')"
        >E
        </el-button
        >
        <el-button plain @click="handleKeysClick('1')">1</el-button>
        <el-button
            plain
            :disabled="keysDisabled(8)"
            @click="handleKeysClick('2')"
        >2
        </el-button
        >
        <el-button
            plain
            :disabled="keysDisabled(8)"
            @click="handleKeysClick('3')"
        >3
        </el-button
        >
        <el-button plain @click="handleKeysClick('+')">＋</el-button>
      </el-row>
      <el-row>
        <el-button
            plain
            :disabled="keysDisabled(16)"
            @click="handleKeysClick('F')"
        >F
        </el-button
        >
        <el-button plain @click="handleKeysClick('neg')">＋/﹣</el-button>
        <el-button plain @click="handleKeysClick('0')">0</el-button>
        <el-button
            plain
            :disabled="keysDisabled(32)"
            @click="handleKeysClick('.')"
        >.
        </el-button
        >
        <el-button plain @click="handleKeysClick('=')">＝</el-button>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="二进制" name="bins">
      <div style="margin-bottom: 2px"></div>
      <template
          v-for="i in [...Array(64 / 16).keys()].map((item) => 64 / 16 - item)"
      >
        <el-row>
          <div
              v-for="j in [...Array(16).keys()].map((item) => i * 16 - 1 - item)"
              :class="binsStyles(j)"
          >
            <el-button
                type="text"
                @click="handleBitClick(j)"
                :disabled="j>=lenbits?true:false"
            >{{
                j >= lenbits
                    ? 0
                    : (strtoNumber(curval, radix) & (1 << j)) === 0
                    ? 0
                    : 1
              }}
            </el-button
            >
            <div v-if="j % 4 == 0" class="bins-tips">{{ j }}</div>
          </div>
        </el-row>
      </template>
    </el-tab-pane>
    <el-tab-pane
        :label="signornot ? '有符号' : '无符号'"
        name="signornot"
    ></el-tab-pane>
    <el-tab-pane :label="sizedes" name="lenbits"></el-tab-pane>
  </el-tabs>
</template>

<script>
import {ref} from "vue";
import {radixOption} from "@/libs/radix"

export default {
  name: "ProgrammerCalculator",
  setup() {
    const {
      setBits,
      setSign,
      radixPrefix,
      isNumber,
      strtoNumber,
      numtoString,
      isRange,
      bytesDescription,
      bitofVal,
      bitChange
    } = radixOption()

    const activeTab = "keys";

    const signornot = ref(true);
    setSign(signornot.value)
    const lenbits = ref(32);
    setBits(lenbits.value)
    const sizedes = ref(bytesDescription());


    const handleTabclick = (active, oldactive) => {
      if (active === "signornot") {
        signornot.value = !signornot.value;
        setSign(signornot)
        return false;
      }
      if (active === "lenbits") {
        switch (lenbits.value) {
          case 8:
            lenbits.value = 16;
            setBits(lenbits.value)
            sizedes.value = bytesDescription();
            break;
          case 16:
            lenbits.value = 32;
            setBits(lenbits.value)
            sizedes.value = bytesDescription();
            break;
          case 32:
            lenbits.value = 8;
            setBits(lenbits.value)
            sizedes.value = bytesDescription();
            break;
          default:
            break;
        }
        return false;
      }
      return true;
    };

    const expression = ref("");
    const lastexpression = ref("");
    const radix = ref("16");
    const curval = ref("");
    const uniqueValue = ref(0);

    function keysDisabled(param) {
      if (param > radix.value) {
        return true;
      }
      return false;
    }

    function handleSelect(key, keyPath) {
      radix.value = key;
    }

    function binsStyles(param) {
      var temVal = Number(
          curval.value.length === 0 ? "0" : radixPrefix(radix.value) + curval.value
      );
      var style = "bins-btn ";
      if (temVal & (1 << param)) {
        style += "bins-btn-1 ";
      } else {
        style += "bins-btn-0 ";
      }
      if (param % 4 == 0) {
        style += "bins-btn-special ";
      } else {
        style += "bins-btn-normal";
      }
      return style;
    }

    function handleKeysClick(param) {
      switch (param) {
        case "neg":
          expression.value = "-(" + expression.value + ")";
          break;
        case "=":
          if (curval.value != "") {
            expression.value += radixPrefix(radix.value) + curval.value;
          }
          curval.value = "";
          uniqueValue.value = eval(expression.value);
          curval.value = numtoString(uniqueValue.value, radix.value);
          lastexpression.value = expression.value + "=" + curval.value;
          expression.value = "";
          break;
        case "-":
        case "+":
        case "*":
        case "/":
        case "%":
        case "<<":
        case ">>":
        case ")":
          expression.value +=
              curval.value === ""
                  ? "0" + param
                  : radixPrefix(radix.value) + curval.value + param;
          curval.value = "";
          break;
        case "ce":
          uniqueValue.value = 0;
          expression.value = "";
          curval.value = "";
          lastexpression.value = "";
          break;
        case "del":
          if (curval.value.length > 0) {
            curval.value = curval.value.slice(0, -1);
          } else {
            expression.value = expression.value.slice(0, -1);
          }
          break;
        case "(":
          expression.value += param;
          break;
        default:
          curval.value += param;
          break;
      }
    }

    const handleBitClick = (bit) => {
      curval.value = numtoString(bitChange(strtoNumber(curval.value, radix.value), bit), radix.value)
    }
    return {
      lastexpression,
      expression,
      uniqueValue,
      curval,
      activeTab,
      lenbits,
      radix,
      signornot,
      sizedes,

      handleSelect,
      handleTabclick,
      handleKeysClick,
      keysDisabled,
      binsStyles,
      //radixOption
      setBits,
      setSign,
      radixPrefix,
      isNumber,
      strtoNumber,
      numtoString,
      isRange,
      bytesDescription,
      bitofVal,
      handleBitClick,
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .bins-btn-1 .el-button--text {
  text-align: center;
  font-size: 24px;
  color: #409eff;
}

/deep/ .bins-btn-0 .el-button--text {
  text-align: center;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.65);
}

/deep/ .bins-btn .el-button.is-disabled {
  color: #c0c4cc !important;
}

/deep/ .bins-btn-normal .el-button--text {
  margin-left: 2px;
  margin-right: 1px;
  margin-top: 1px;
}

/deep/ .bins-btn-special .el-button--text {
  margin-left: 2px;
  margin-right: 10px;
  margin-top: 1px;
}

/deep/ .keys-btn .el-button {
  width: 68px;
}

/deep/ .keys-btn .el-button + .el-button {
  margin-left: 1px;
  margin-top: 1px;
}

/deep/ .el-menu-item,
.el-submenu__title {
  height: 32px;
  line-height: 32px;
}

.line {
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  text-align: left;
  margin-left: 10px;
}

.top-uniqueValue {
  text-align: right;
  width: 100%;
  font-size: 24px;
}

.top-expression {
  text-align: right;
  width: 100%;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
}

.top-expression-div {
  height: 20px;
  line-height: 20px;
}

.top-uniqueValue-div {
  height: 32px;
  line-height: 32px;
}

.calc-width {
  max-width: 380px;
}

.bins-tips {
  font-size: 12px;
}

/deep/ .el-menu-item {
  padding-left: 0 !important;
}


/deep/ .el-tabs__item {
  height: min-content;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}
</style>