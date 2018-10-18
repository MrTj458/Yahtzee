import React from 'react'
import Dice from './Dice'
import { Grid, Button, Divider, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { rollDice, newGame, postScore } from '../reducers/currentGame'

const calcScores = (scores) => {
	return scores.map( s => s.score )
		.reduce( (total, score) => {
			return total + score
		}, 0)
}

const checkEndGame = (scores, dispatch) => {
	let gameOver = true

	scores.map( s => s.score )
		.forEach( score => {
			if(score === null) {
				gameOver = false
			}
		})

		if (gameOver) {
			dispatch(postScore(this.calcScores(scores)))
		}
	
		return gameOver
}

const Board = ({ roll, dice, keep, dispatch, scores }) => {
	const maxRoll = roll === 3
	const disabled = maxRoll ? { disabled: true } : {}
	const gameOver = checkEndGame(scores, dispatch)
	return (
		<Grid>
			<Grid.Row>
				<Button
					fluid
					onClick={gameOver? () => dispatch(newGame()) : () => dispatch(rollDice())}
					{...disabled}
				>
					{ gameOver ? 'New Game' : 'Roll' }
				</Button>
				<Grid.Column width={16}>
					<Divider hidden />
				</Grid.Column>
				{ roll > 0 &&
						dice.map( (d,i) => {
							const kept = keep.includes(i)
							return (
								<Dice
									key={i}
									value={d}
									kept={kept}
									index={i}
								/>
							)
						})
				}
			</Grid.Row>
			<Grid.Row columns={1} textAlign="center">
				<Grid.Column>
					<Header as="h3">
						total: {calcScores(scores)}
					</Header>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

const mapStateToProps = state => {
	const { dice, keep, roll, scores } = state.currentGame
	return {
		dice,
		keep,
		roll,
		scores,
	}
}

export default connect(mapStateToProps)(Board)
